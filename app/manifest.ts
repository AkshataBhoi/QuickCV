import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
    return {
        name: 'ResuStack AI',
        short_name: 'ResuStack',
        description: 'Free AI Resume Builder for Software Engineers',
        start_url: '/',
        display: 'standalone',
        background_color: '#0f172a',
        theme_color: '#0f172a',
        icons: [
            {
                src: '/icons/favicon-192x192.png',
                sizes: '192x192',
                type: 'image/png',
            },
            {
                src: '/icons/favicon-512x512.png',
                sizes: '512x512',
                type: 'image/png',
            },
        ],
    }
}
