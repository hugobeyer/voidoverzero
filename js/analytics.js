/**
 * Analytics Tracking Script
 * Tracks visitors, IPs, cities, and referrers
 */

const Analytics = {
    storageKey: 'site_analytics',
    apiEndpoint: 'https://ipapi.co/json/',

    async trackVisit() {
        try {
            const data = await this.getVisitorData();
            this.saveVisit(data);
        } catch (error) {
            console.warn('Analytics tracking failed:', error);
        }
    },

    async getVisitorData() {
        const visit = {
            timestamp: new Date().toISOString(),
            page: window.location.pathname + window.location.search,
            referrer: document.referrer || 'Direct',
            userAgent: navigator.userAgent,
            language: navigator.language,
            screen: `${window.screen.width}x${window.screen.height}`,
            timezone: Intl.DateTimeFormat().resolvedOptions().timeZone
        };

        try {
            const geoData = await fetch(this.apiEndpoint).then(r => r.json());
            visit.ip = geoData.ip || 'Unknown';
            visit.city = geoData.city || 'Unknown';
            visit.region = geoData.region || 'Unknown';
            visit.country = geoData.country_name || 'Unknown';
            visit.countryCode = geoData.country_code || 'Unknown';
            visit.isp = geoData.org || 'Unknown';
        } catch (error) {
            visit.ip = 'Unknown';
            visit.city = 'Unknown';
            visit.region = 'Unknown';
            visit.country = 'Unknown';
            visit.countryCode = 'Unknown';
            visit.isp = 'Unknown';
        }

        return visit;
    },

    saveVisit(visit) {
        let analytics = this.getAnalytics();
        analytics.visits.push(visit);
        
        if (analytics.visits.length > 10000) {
            analytics.visits = analytics.visits.slice(-10000);
        }
        
        localStorage.setItem(this.storageKey, JSON.stringify(analytics));
    },

    getAnalytics() {
        const stored = localStorage.getItem(this.storageKey);
        if (stored) {
            return JSON.parse(stored);
        }
        return {
            visits: [],
            lastUpdated: new Date().toISOString()
        };
    },

    getStats() {
        const analytics = this.getAnalytics();
        const visits = analytics.visits;
        
        const stats = {
            totalVisits: visits.length,
            uniqueIPs: new Set(visits.map(v => v.ip)).size,
            uniqueCities: new Set(visits.map(v => v.city)).size,
            topCities: this.getTopCities(visits),
            topReferrers: this.getTopReferrers(visits),
            topPages: this.getTopPages(visits),
            visitsByCountry: this.getVisitsByCountry(visits),
            recentVisits: visits.slice(-50).reverse()
        };
        
        return stats;
    },

    getTopCities(visits, limit = 10) {
        const cityCount = {};
        visits.forEach(v => {
            const city = v.city || 'Unknown';
            cityCount[city] = (cityCount[city] || 0) + 1;
        });
        
        return Object.entries(cityCount)
            .map(([city, count]) => ({ city, count }))
            .sort((a, b) => b.count - a.count)
            .slice(0, limit);
    },

    getTopReferrers(visits, limit = 10) {
        const referrerCount = {};
        visits.forEach(v => {
            const ref = v.referrer === '' ? 'Direct' : this.getDomain(v.referrer);
            referrerCount[ref] = (referrerCount[ref] || 0) + 1;
        });
        
        return Object.entries(referrerCount)
            .map(([referrer, count]) => ({ referrer, count }))
            .sort((a, b) => b.count - a.count)
            .slice(0, limit);
    },

    getTopPages(visits, limit = 10) {
        const pageCount = {};
        visits.forEach(v => {
            const page = v.page || '/';
            pageCount[page] = (pageCount[page] || 0) + 1;
        });
        
        return Object.entries(pageCount)
            .map(([page, count]) => ({ page, count }))
            .sort((a, b) => b.count - a.count)
            .slice(0, limit);
    },

    getVisitsByCountry(visits) {
        const countryCount = {};
        visits.forEach(v => {
            const country = v.country || 'Unknown';
            countryCount[country] = (countryCount[country] || 0) + 1;
        });
        
        return Object.entries(countryCount)
            .map(([country, count]) => ({ country, count }))
            .sort((a, b) => b.count - a.count);
    },

    getDomain(url) {
        try {
            return new URL(url).hostname.replace('www.', '');
        } catch {
            return url;
        }
    },

    clearData() {
        localStorage.removeItem(this.storageKey);
    },

    exportData() {
        return this.getAnalytics();
    }
};

if (typeof window !== 'undefined') {
    Analytics.trackVisit();
}
