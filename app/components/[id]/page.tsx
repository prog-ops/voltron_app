'use client'
import {gql, useQuery} from "@apollo/client";

type Props = {
    params: {
        id: string
    }
}


// Change $stationId to $id
const GET_CHARGE_STATION_DETAIL = gql`
    query PublicChargeStation($id: bigint) {
        publicChargeStation(where: {id: {_eq: $id}}) {
            id
            name
            coordinates
            address
            city
            state
            postalCode
            operatingHours
            isAvailable
            type
            chargePoints(orderBy: {position: ASC}) {
                id
                isAvailable
                online
                chargePointConnectors(orderBy: {position: ASC}) {
                    id
                    chargePointId
                    position
                    connector
                    maxPower
                    available
                    enumConnector {
                        type
                    }
                    tariff {
                        id
                        priceKwh
                        adminFee
                        connectionFee
                        currencyId
                        pjnFee
                        priceKwhOriginal
                        connectionFeeOriginal
                        discountPercentageKwh
                        discountPercentageSurcharge
                        discountPercentageAdminFee
                        tax {
                            id
                            amount
                        }
                    }
                }
            }
            total: chargePointsAggregate {
                aggregate {
                    count
                }
            }
            available: chargePointsAggregate(where: {isAvailable: {_eq:
            "Available"}}) {
                aggregate {
                    count
                }
            }
        }
    }
`;

export default function StationDetail({ params }: Props){
    const {id} = params

    const {
        loading, error,
        data
    } = useQuery(GET_CHARGE_STATION_DETAIL, {
        variables: {
            id: parseInt(id)
        },
    });

    if (loading) return <p>Harap tunggu...</p>;
    if (error) return <p>Error nih! {error.message}</p>;

    const station = data?.publicChargeStation?.[0];

    if (!station) return <p>No station data found.</p>;

    return(
        <div>
            <h1>Station {station.id} details</h1>
            <h1>{station.name}</h1>
            <h1>{station.address}</h1>
            <h1>{station.city}</h1>
            <h1>{station.state}</h1>

            <p>Operating Hours: {station.operatingHours.alwaysOpen ? 'Always Open' : 'Specific Hours'}</p>
            {station.operatingHours.openingDays && (
                <ul>
                    {station.operatingHours.openingDays.map((day: any, index: number) => (
                        <li key={index}>{day.day}: {day.startTime} - {day.endTime}</li>
                    ))}
                </ul>
            )}

            <p className='mb-8'>Available Charge Points: {station.total.aggregate.count}</p>

            {station.chargePoints.map((chargePoint: any) => (
                <div key={chargePoint.id} className="mb-8">
                    <h2 className="text-xl font-bold mb-4">Charge Point ID: {chargePoint.id}</h2>
                    <table className="min-w-full max-h-screen bg-white border border-gray-200">
                        <thead>
                        <tr>
                            <th className="px-4 py-2 border border-gray-200">Connector ID</th>
                            <th className="px-4 py-2 border border-gray-200">Connector Type</th>
                            <th className="px-4 py-2 border border-gray-200">Max Power (kW)</th>
                            <th className="px-4 py-2 border border-gray-200">Available</th>
                            <th className="px-4 py-2 border border-gray-200">Tariff Price per kWh</th>
                        </tr>
                        </thead>
                        <tbody>
                        {chargePoint.chargePointConnectors.map((connector: any) => (
                            <tr key={connector.id}>
                                <td className="px-4 py-2 border border-gray-200">{connector.id}</td>
                                <td className="px-4 py-2 border border-gray-200">{connector.enumConnector.type}</td>
                                <td className="px-4 py-2 border border-gray-200">{connector.maxPower} kW</td>
                                <td className="px-4 py-2 border border-gray-200">{connector.available ? "Yes" : "No"}</td>
                                <td className="px-4 py-2 border border-gray-200">{connector.tariff.priceKwh} {connector.tariff.currencyId}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            ))}

        </div>
    )
}
