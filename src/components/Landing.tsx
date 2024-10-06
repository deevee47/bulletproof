import React from 'react'
import BlurIn from './ui/blur-in'
import TopographicBackground from './TopographicBackground'


const Landing = () => {
    return (
        <div className='h-screen flex relative overflow-hidden'>
            {/* !TODO:  Background to smooth moving banana hai */}
            <TopographicBackground />
            <div className='p-20 z-10 w-full  items-center relative flex justify-center flex-col'>
                <BlurIn
                    word="BULLETPROOF 2.0"
                    className="text-8xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-gray-200 via-gray-400 to-gray-600 [text-shadow:_2px_2px_2px_rgb(0_0_0_/_20%)]"
                />
                {/* !TODO: Chage sub text */}
                <BlurIn
                    word="The event you have been waiting for"
                    className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-gray-200 via-gray-400 to-gray-600 [text-shadow:_1px_1px_1px_rgb(0_0_0_/_20%)] mt-4"
                />

                <div className="mt-8 space-y-4 max-w-2xl">
                    <p className="text-gray-400 text-lg">
                        Elevating digital defense to an art form. Our cutting-edge security
                        protocols ensure your data remains impenetrable.
                    </p>
                </div>


            </div>
        </div>
    )
}

export default Landing