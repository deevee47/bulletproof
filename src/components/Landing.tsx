import React from 'react'
import BlurIn from './ui/blur-in'
import TopographicBackground from './TopographicBackground'
import Image from 'next/image'
import { ChevronsDown } from 'lucide-react'

const Landing = () => {
    return (
        <div className='flex relative min-h-screen overflow-hidden'>
            <TopographicBackground />
            <div className='z-10 w-full px-4 sm:px-6 lg:px-8 flex justify-center items-center'>
                <div className='w-full flex flex-col items-center justify-center'>
                    <div className='relative w-full'>
                        <div className='mx-auto relative w-[100%] sm:w-[70%] aspect-[6/5] sm:-mt-20'>
                            <Image
                                className='logo object-contain draggable-none'
                                src="/logo.png"
                                alt="Bulletproof Logo"
                                fill
                                priority
                            />
                        </div>

                        <div className='-mt-16 sm:-mt-96 transform flex flex-col items-center'>
                            <BlurIn
                                word="The event you have been waiting for"
                                className="text-xl sm:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-gray-200 via-gray-400 to-gray-600 [text-shadow:_1px_1px_1px_rgb(0_0_0_/_20%)] text-center"
                            />

                            <div className="mt-4 sm:mt-6 md:mt-8 space-y-2 max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl px-4">
                                <p className="text-gray-400 text-sm sm:text-base md:text-lg lg:text-xl text-center">
                                    Elevating digital defense to an art form. Our cutting-edge security
                                    protocols ensure your data remains impenetrable.
                                </p>
                            </div>
                            <ul className='mt-10 text-3xl animate-bounce text-gray-400'><ChevronsDown /></ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Landing