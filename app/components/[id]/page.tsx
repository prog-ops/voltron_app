'use client'
import {gql, useQuery} from "@apollo/client";
import {Heading} from "@/app/custom-components/Text";

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
            <Heading className="bg-customGreen p-4">Station {station.id} details</Heading>
            <Heading as='h2' className="p-4">{station.name}</Heading>
            <Heading as='h4' className="ml-4">{station.address}</Heading>
            <Heading as='h4' className="ml-4">{station.city}, {station.state}</Heading>

            <Heading as='h6' className="ml-4">Operating Hours: {station.operatingHours.alwaysOpen
                ? 'Always Open'
                : 'Specific Hours'}
            </Heading>
            {station.operatingHours.openingDays ? (
                <ul>
                    {station.operatingHours.openingDays.map((day: any, index: number) => (
                        <li key={index}>
                            <Heading as='h6' className="ml-4">
                                {day.day}: {day.startTime} - {day.endTime}
                            </Heading>
                        </li>
                    ))}
                </ul>
            ) : null}

            <Heading as='h4' className='ml-4 mb-8'>Available Charge Points: {station.total.aggregate.count}</Heading>

            {station.chargePoints.map((chargePoint: any) => (
                <div key={chargePoint.id} className="overflow-auto max-h-screen p-4">
                    <Heading as='h2' className="text-xl font-bold ml-4 mb-4">Charge Point ID: {chargePoint.id}</Heading>
                    <table className="min-w-full bg-customGreen border-hidden border-gray-200 rounded-custom">
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
