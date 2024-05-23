'use client'
import {Heading} from "@/app/custom-components/Text";
import {useDarkMode} from "@/app/hooks/DarkModeContext";

const MainTitle = () => {
    const { darkMode, toggleDarkMode } = useDarkMode();

    return (
        <div className="mx-auto px-4 md:text-red-200 lg:text-customGreen mb-10 flex justify-between items-center">
            <Heading as='h1' className="text-2xl md:text-4xl lg:text-6xl">
                Charge Stations
            </Heading>
            <button
                onClick={toggleDarkMode}
                className="ms-4 px-6 bg-gray-200 dark:bg-gray-500 dark:text-orange-500 rounded-full"
            >
                {darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            </button>
        </div>
    );
};

export default MainTitle;
