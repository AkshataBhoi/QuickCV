"use client";

import SlidingLogoMarquee from "@/components/ui/sliding-logo-marquee";

const companies = [
    {
        name: "Google",
        icon: (
            <svg viewBox="0 0 24 24" className="w-8 h-8 md:w-6 md:h-6" fill="currentColor">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
            </svg>
        ),
    },
    {
        name: "Microsoft",
        icon: (
            <svg viewBox="0 0 24 24" className="w-8 h-8 md:w-6 md:h-6" fill="currentColor">
                <path d="M11.4 24H0V12.6h11.4V24zM24 24H12.6V12.6H24V24zM11.4 11.4H0V0h11.4v11.4zm12.6 0H12.6V0H24v11.4z" fill="#F25022" />
                <path d="M24 11.4H12.6V0H24v11.4z" fill="#7FBA00" />
                <path d="M11.4 24H0V12.6h11.4V24z" fill="#00A4EF" />
                <path d="M24 24H12.6V12.6H24V24z" fill="#FFB900" />
            </svg>
        ),
    },
    {
        name: "Amazon",
        icon: (
            <svg viewBox="0 0 24 24" className="w-8 h-8 md:w-6 md:h-6" fill="currentColor">
                <path d="M13.684 12.3c.099-.18.179-.31.332-.477.568-.588 1.258-.876 2.052-.876 1.48 0 2.223.864 2.223 2.576v4.61h-2.185V13.88c0-1.077-.42-1.604-1.272-1.604-.84 0-1.63.468-2.296 1.344v4.512h-2.186V9.432h2.11v.961c.6-.745 1.381-1.321 2.45-1.321 1.765 0 2.924 1.153 2.924 3.033v6.027h2.186v-6.388c0-1.129-.408-2.125-1.176-2.88-.768-.769-1.8-1.165-2.988-1.165-1.165 0-2.197.385-3.097 1.153-.024.024-.047.048-.071.072v-.937h-2.138v8.72h2.137V12.3h-.005zm-6.28 2.042c-1.321 0-2.318.42-2.906 1.237v.048c.576.264 1.129.564 1.633.913.384.264.72.564.996.9.229.288.337.588.337.936 0 .504-.217.925-.625 1.189-.42.276-.924.42-1.5.42-.6 0-1.069-.168-1.429-.492-.36-.312-.528-.732-.528-1.248 0-.913.6-1.729 1.765-2.221.72-.313 1.549-.553 2.378-.71-.06-.311-.18-.563-.348-.755-.265-.3-.648-.444-1.129-.444-.456 0-.84.096-1.116.276-.276.192-.492.492-.6.9l-1.993-.24c.204-1.129.744-1.957 1.609-2.485.852-.516 1.945-.78 3.206-.78 1.249 0 2.221.264 2.894.792.672.528 1.008 1.309 1.008 2.365v3.17c0 .54.072.96.216 1.272.132.312.372.588.684.816v.216h-2.293c-.156-.228-.276-.48-.36-.78-.588.66-1.345 1.08-2.281 1.08-1.141 0-2.078-.348-2.738-1.057-.66-.696-.984-1.573-.984-2.581 0-1.129.372-2.041 1.104-2.701.745-.66 1.838-1.069 3.254-1.2 1.056-.096 1.981.012 2.762.336v-.216c0-.528-.156-.948-.468-1.248-.3-.288-.937-.444-1.909-.444zM24 .216C23.952.12 23.856.072 23.712.072c-1.525.108-3.038.397-4.515.865-1.5.468-2.906 1.045-4.143 1.765-.396.228-.732.444-.984.624.216.144.24.312.12.48-.132.168-.288.204-.504.12-.06-.024-.156-.072-.288-.132l-.312-.132c-2.714-1.033-5.464-1.55-8.249-1.55-4.179 0-8.044 1.033-11.597 3.098-.156.096-.276.096-.348-.024l-.072-.12c1.477-1.405 3.23-2.521 5.283-3.35C5.972.828 8.12.42 10.33.42c1.441 0 2.929.192 4.419.588 1.513.408 2.882.973 4.106 1.693.396.24.732.456.985.648.204-.144.228-.288.12-.468-.132-.18-.3-.228-.516-.132-.06.036-.156.072-.288.132-.12.048-.216.096-.288.132-2.798-1.057-5.548-1.597-8.237-1.597-1.189 0-2.366.096-3.53.288 5.391-.276 9.171.744 11.236 2.989.876 1.009 1.621 1.417 2.221 1.297.228-.048.372-.144.408-.288.06-.216-.012-.396-.192-.48l-.144-.048c-.685-.3-1.609-.42-2.738-.36l-1.165.048c.108-.204.096-.396-.048-.564-.132-.18-.36-.432-.732-.757-1.897-1.705-4.635-2.557-8.153-2.557l-.36.009z" fill="#FF9900" />
            </svg>
        ),
    },
    {
        name: "Netflix",
        icon: (
            <svg viewBox="0 0 24 24" className="w-8 h-8 md:w-6 md:h-6" fill="currentColor">
                <path d="M5.398 0v.006c3.028 8.556 5.37 15.175 8.348 23.596 2.344.058 4.85.398 4.854.398-2.8-7.924-5.923-16.747-8.487-24zm8.489 0v9.63L18.6 22.951c-.043-7.86-.004-15.913.002-22.95zM5.398 1.05V24c1.873-.225 2.81-.312 4.715-.398v-9.22z" fill="#E50914" />
            </svg>
        ),
    },
    {
        name: "Meta",
        icon: (
            <svg viewBox="0 0 24 24" className="w-8 h-8 md:w-6 md:h-6" fill="currentColor">
                <path d="M12 2C6.477 2 2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.879V14.89h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.989C18.343 21.129 22 16.99 22 12c0-5.523-4.477-10-10-10z" fill="#0866FF" />
            </svg>
        ),
    },
    {
        name: "Apple",
        icon: (
            <svg viewBox="0 0 24 24" className="w-8 h-8 md:w-6 md:h-6" fill="currentColor">
                <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" fill="currentColor" />
            </svg>
        ),
    },
    {
        name: "Spotify",
        icon: (
            <svg viewBox="0 0 24 24" className="w-8 h-8 md:w-6 md:h-6" fill="currentColor">
                <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" fill="#1DB954" />
            </svg>
        ),
    },
    {
        name: "Uber",
        icon: (
            <svg viewBox="0 0 24 24" className="w-16 h-8 md:w-12 md:h-6" fill="currentColor">
                <path d="M12.924 16.5c-2.484 0-4.5-2.016-4.5-4.5s2.016-4.5 4.5-4.5 4.5 2.016 4.5 4.5-2.016 4.5-4.5 4.5m0-7.836c-1.836 0-3.336 1.5-3.336 3.336s1.5 3.336 3.336 3.336S16.26 13.836 16.26 12 14.76 8.664 12.924 8.664M4.824 16.26H7.32v-8.7H4.824v8.7zM7.332 4.56c0 .804-.648 1.452-1.452 1.452-.804 0-1.452-.648-1.452-1.452 0-.804.648-1.452 1.452-1.452.804 0 1.452.648 1.452 1.452M19.38 7.56v1.392c.624-.96 1.608-1.584 2.844-1.584 2.196 0 3.324 1.272 3.324 3.636v5.256h-2.496v-4.8c0-1.332-.468-1.92-1.464-1.92-1.068 0-1.92.816-1.92 2.304v4.416h-2.496v-8.7h2.208z" fill="#FFFFFF" />
            </svg>
        ),
    },
    {
        name: "Stripe",
        icon: (
            <svg viewBox="0 0 24 24" className="w-8 h-8 md:w-6 md:h-6" fill="currentColor">
                <path d="M13.976 9.15c-2.172-.806-3.356-1.426-3.356-2.409 0-.831.683-1.305 1.901-1.305 2.227 0 4.515.858 6.09 1.631l.89-5.494C18.252.975 15.697 0 12.165 0 9.667 0 7.589.654 6.104 1.872 4.56 3.147 3.757 4.992 3.757 7.218c0 4.039 2.467 5.76 6.476 7.219 2.585.92 3.445 1.574 3.445 2.583 0 .98-.84 1.545-2.354 1.545-1.875 0-4.965-.921-6.99-2.109l-.9 5.555C5.175 22.99 8.385 24 11.714 24c2.641 0 4.843-.624 6.328-1.813 1.664-1.305 2.525-3.236 2.525-5.732 0-4.128-2.524-5.851-6.594-7.305h.003z" fill="#635BFF" />
            </svg>
        ),
    },
];

export function CompanyLogos() {
    return (
        <section className="relative w-full overflow-hidden bg-[#050816] py-16 md:py-24">
            {/* Background Effects */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent opacity-50" />
            <div className="absolute inset-0 bg-[linear-gradient(to_bottom,_transparent_0%,_#050816_100%)]" />

            <div className="container relative z-10 px-4 md:px-6 mx-auto max-w-7xl">
                {/* Heading Section */}
                <div className="text-center mb-12 space-y-4">
                    <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold tracking-tight text-white/90">
                        Build Resumes That Land Interviews At
                    </h2>
                    <p className="text-base md:text-lg text-gray-400 max-w-2xl mx-auto">
                        Create resumes optimized for roles at leading organizations
                    </p>
                </div>


                {/* Lightswind Sliding Logo Marquee */}
                <SlidingLogoMarquee
                    items={companies.map((company) => ({
                        id: company.name,
                        content: (
                            <div className="flex items-center gap-2 md:gap-3 px-2 md:px-4 py-2 opacity-60 hover:opacity-100 transition-opacity duration-300">
                                <div className="shrink-0">{company.icon}</div>
                                <span className="text-sm md:text-lg font-bold text-white/80 tracking-wide">{company.name}</span>
                            </div>
                        ),
                    }))}
                    speed={40}
                    pauseOnHover={true}
                    blurEdges={true}
                    blurWidth="150px"
                    itemClassName="mx-1 md:mx-2"
                />

                {/* Feature List */}
                <div className="mt-16 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-sm md:text-base">
                    <div className="flex items-center gap-2 text-gray-300">
                        <svg
                            className="h-5 w-5 text-green-500 flex-shrink-0"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2.5}
                                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                        </svg>
                        <span>ATS-optimized formats</span>
                    </div>

                    <div className="hidden sm:block h-1 w-1 rounded-full bg-gray-600" aria-hidden="true" />

                    <div className="flex items-center gap-2 text-gray-300">
                        <svg
                            className="h-5 w-5 text-green-500 flex-shrink-0"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2.5}
                                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                        </svg>
                        <span>Industry-specific templates</span>
                    </div>

                    <div className="hidden sm:block h-1 w-1 rounded-full bg-gray-600" aria-hidden="true" />

                    <div className="flex items-center gap-2 text-gray-300">
                        <svg
                            className="h-5 w-5 text-green-500 flex-shrink-0"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2.5}
                                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                        </svg>
                        <span>AI-powered optimization</span>
                    </div>
                </div>
            </div>
        </section>
    );
}
