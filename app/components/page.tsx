'use client'
import {gql, useQuery} from "@apollo/client";
import Link from "next/link";
import {Heading} from "@/app/custom-components/Text";

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
                <Link
                    key={chargeStation.id} // not stationId
                    href={`components/${chargeStation.id}`}
                >
                    <div
                        className='bg-customGreen mb-4 pt-2 pb-6 ps-8 pe-8 rounded-custom border border-white transform hover:scale-25 transition duration-75'>
                        <Heading as='h2' className='mb-2 mt-2'>{chargeStation.name}</Heading>
                        <Heading as='h4' className='mb-2'>{chargeStation.address}</Heading>
                        <Heading as='h6' className='text-gray-500'>{chargeStation.id}</Heading>
                    </div>
                </Link>
            ))}
        </div>
    );
};
