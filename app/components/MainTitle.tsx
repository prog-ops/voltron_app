import {Heading} from "@/app/custom-components/Text";

const MainTitle = () => {
    return (
        <div className="mx-auto px-4 md:text-red-200 lg:text-customGreen mb-4">
            <Heading as='h1' className="text-2xl md:text-4xl lg:text-6xl mb-10">
                Charge Stations
            </Heading>
        </div>
    );
};

export default MainTitle;
