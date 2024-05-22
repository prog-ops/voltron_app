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
        </div>
    )
}
