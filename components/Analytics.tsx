"use client";

import { Suspense, useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";

function AnalyticsContent() {
    const pathname = usePathname();
    const searchParams = useSearchParams();

    useEffect(() => {
        const url = pathname + searchParams.toString();
        
        // Vercel Analytics (ถ้าติดตั้ง @vercel/analytics)
        // import { track } from '@vercel/analytics';
        // track('pageview', { path: url });
        
        // Google Analytics (ถ้าติดตั้ง)
        // if (typeof window !== 'undefined' && (window as any).gtag) {
        //     (window as any).gtag('config', 'GA_MEASUREMENT_ID', {
        //         page_path: url,
        //     });
        // }
        
        if (process.env.NODE_ENV === 'development') {
            console.log("📊 Page view:", url);
        }
    }, [pathname, searchParams]);

    return null;
}

export function Analytics() {
    return (
        <Suspense fallback={null}>
            <AnalyticsContent />
        </Suspense>
    );
}
