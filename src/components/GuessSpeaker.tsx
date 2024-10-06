"use client"
import React from 'react'
import BoxReveal from './ui/box-reveal'

const GuessSpeaker = () => {
    return (
        <div className='text-white min-h-screen flex justify-center items-center py-16 relative overflow-hidden'>

            <div className='w-full max-w-2xl px-4 relative z-10'>
                <div className="size-full items-center justify-center overflow-hidden pt-8 mb-12">
                    {/* Maybe iska gradient change kar sakte hai */}
                    <BoxReveal boxColor={"#fbd38d"} duration={0.5}>
                        <p className="text-6xl font-semibold bg-clip-text text-transparent bg-gradient-to-b from-gray-200 via-gray-400 to-gray-600 [text-shadow:_1px_1px_1px_rgb(0_0_0_/_20%)]">
                            Guess Our Speakers
                        </p>
                    </BoxReveal>
                </div>

                <div className='rounded-2xl p-8 relative'>
                    <form className='space-y-6 relative'>
                        <div className='grid grid-cols-2 gap-4'>
                            {['firstName', 'lastName'].map((field) => (
                                <div key={field} className='space-y-2'>
                                    <label htmlFor={field} className='block text-sm font-medium text-gray-200'>
                                        {field === 'firstName' ? 'First Name' : 'Last Name'}
                                    </label>
                                    <div className="relative">
                                        <input
                                            id={field}
                                            placeholder={`Enter your ${field === 'firstName' ? 'first' : 'last'} name`}
                                            className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 focus:border-orange-300/50 focus:ring-2 focus:ring-orange-300/50 transition-all duration-300 text-white placeholder:text-gray-400 outline-none backdrop-blur-sm"
                                        />
                                        <div className="absolute inset-0 rounded-lg bg-gradient-to-b from-white/5 to-transparent pointer-events-none"></div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className='space-y-2'>
                            <label htmlFor="email" className='block text-sm font-medium text-gray-200'>
                                Email Address
                            </label>
                            <div className="relative">
                                <input
                                    id="email"
                                    type="email"
                                    placeholder="you@example.com"
                                    className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 focus:border-orange-300/50 focus:ring-2 focus:ring-orange-300/50 transition-all duration-300 text-white placeholder:text-gray-400 outline-none backdrop-blur-sm"
                                />
                                <div className="absolute inset-0 rounded-lg bg-gradient-to-b from-white/5 to-transparent pointer-events-none"></div>
                            </div>
                        </div>

                        <div className='space-y-2'>
                            <label htmlFor="expectations" className='block text-sm font-medium text-gray-200'>
                                What do you expect from the event?
                            </label>
                            <div className="relative">
                                <textarea
                                    id="expectations"
                                    placeholder="Share your expectations..."
                                    className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 focus:border-orange-300/50 focus:ring-2 focus:ring-orange-300/50 transition-all duration-300 text-white placeholder:text-gray-400 outline-none min-h-[100px] resize-none backdrop-blur-sm"
                                />
                                <div className="absolute inset-0 rounded-lg bg-gradient-to-b from-white/5 to-transparent pointer-events-none"></div>
                            </div>
                        </div>

                        <button className="relative w-full bg-gradient-to-r from-orange-300 to-orange-400 hover:from-orange-400 hover:to-orange-500 text-gray-800 font-semibold py-3 px-4 rounded-lg transition-all duration-300 transform hover:scale-[1.02] focus:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-orange-300/50 shadow-lg hover:shadow-xl overflow-hidden group">
                            <div className="absolute inset-0 bg-white/30 rounded-lg transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></div>
                            <span className="relative">Submit Your Guess</span>
                        </button>
                    </form>
                </div>
            </div>

            <style jsx>{`
                @keyframes blob {
                    0% { transform: translate(0px, 0px) scale(1); }
                    33% { transform: translate(30px, -50px) scale(1.1); }
                    66% { transform: translate(-20px, 20px) scale(0.9); }
                    100% { transform: translate(0px, 0px) scale(1); }
                }
                .animate-blob {
                    animation: blob 7s infinite;
                }
                .animation-delay-2000 {
                    animation-delay: 2s;
                }
                .animation-delay-4000 {
                    animation-delay: 4s;
                }
            `}</style>
        </div>
    )
}

export default GuessSpeaker