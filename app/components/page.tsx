'use client'
import {gql, useQuery} from "@apollo/client";
import Link from "next/link";

const GET_CHARGE_STATION = gql`
    query GetChargeStation($limit: Int, $offset: Int) {
        publicChargeStation(limit: $limit, offset: $offset, orderBy: {createdAt: ASC}) {
            id
            name
            coordinates
            address
            city
            state
            postalCode
            operatingHours
            chargePoints {
                id
                chargePointConnectors {
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
            total: chargePointsAggregate(where: {isAvailable: {_eq:
            "Available"}}) {
                aggregate {
                    count
                }
            }

        }
    }
`;

export default function Main() {
    const {loading, error, data} = useQuery(GET_CHARGE_STATION, {
        variables: {limit: 15, offset: 1},
    });

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    // Access publicChargeStation from the query result
    const chargeStations = data.publicChargeStation;

    return (
        <div>
            {chargeStations?.map((chargeStation: any) => (
                <div className='bg-customGreen mb-4 p-4'>
                    <Link
                        key={chargeStation.id} // not stationId
                        href={`components/${chargeStation.id}`}
                    >
                        <h1>{chargeStation.id} {chargeStation.name}</h1>
                    </Link>

                    <p>Address: {chargeStation.address}, {chargeStation.city}, {chargeStation.state}, {chargeStation.postalCode}</p>
                </div>
            ))}
        </div>
    );
};
