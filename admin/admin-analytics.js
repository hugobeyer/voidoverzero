/**
 * Admin Analytics Module
 * Displays visitor analytics data
 */

const AdminAnalytics = {
    init() {
        this.refreshAnalytics();
    },

    refreshAnalytics() {
        if (typeof Analytics === 'undefined') {
            console.error('Analytics script not loaded');
            return;
        }

        const stats = Analytics.getStats();
        this.renderStats(stats);
        this.renderTopCities(stats.topCities);
        this.renderTopReferrers(stats.topReferrers);
        this.renderTopPages(stats.topPages);
        this.renderTopCountries(stats.visitsByCountry);
        this.renderRecentVisits(stats.recentVisits);
    },

    renderStats(stats) {
        const container = document.getElementById('analytics-stats');
        container.innerHTML = `
            <div class="stat-card">
                <div class="stat-value">${stats.totalVisits.toLocaleString()}</div>
                <div class="stat-label">Total Visits</div>
            </div>
            <div class="stat-card">
                <div class="stat-value">${stats.uniqueIPs.toLocaleString()}</div>
                <div class="stat-label">Unique IPs</div>
            </div>
            <div class="stat-card">
                <div class="stat-value">${stats.uniqueCities.toLocaleString()}</div>
                <div class="stat-label">Unique Cities</div>
            </div>
            <div class="stat-card">
                <div class="stat-value">${stats.topReferrers.length}</div>
                <div class="stat-label">Referrer Sources</div>
            </div>
        `;
    },

    renderTopCities(cities) {
        const container = document.getElementById('top-cities');
        if (cities.length === 0) {
            container.innerHTML = '<p class="no-data">No city data available</p>';
            return;
        }
        container.innerHTML = `
            <table>
                <thead>
                    <tr>
                        <th>City</th>
                        <th>Visits</th>
                    </tr>
                </thead>
                <tbody>
                    ${cities.map(city => `
                        <tr>
                            <td>${city.city}</td>
                            <td>${city.count.toLocaleString()}</td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        `;
    },

    renderTopReferrers(referrers) {
        const container = document.getElementById('top-referrers');
        if (referrers.length === 0) {
            container.innerHTML = '<p class="no-data">No referrer data available</p>';
            return;
        }
        container.innerHTML = `
            <table>
                <thead>
                    <tr>
                        <th>Source</th>
                        <th>Visits</th>
                    </tr>
                </thead>
                <tbody>
                    ${referrers.map(ref => `
                        <tr>
                            <td>${ref.referrer}</td>
                            <td>${ref.count.toLocaleString()}</td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        `;
    },

    renderTopPages(pages) {
        const container = document.getElementById('top-pages');
        if (pages.length === 0) {
            container.innerHTML = '<p class="no-data">No page data available</p>';
            return;
        }
        container.innerHTML = `
            <table>
                <thead>
                    <tr>
                        <th>Page</th>
                        <th>Visits</th>
                    </tr>
                </thead>
                <tbody>
                    ${pages.map(page => `
                        <tr>
                            <td><code>${page.page}</code></td>
                            <td>${page.count.toLocaleString()}</td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        `;
    },

    renderTopCountries(countries) {
        const container = document.getElementById('top-countries');
        if (countries.length === 0) {
            container.innerHTML = '<p class="no-data">No country data available</p>';
            return;
        }
        container.innerHTML = `
            <table>
                <thead>
                    <tr>
                        <th>Country</th>
                        <th>Visits</th>
                    </tr>
                </thead>
                <tbody>
                    ${countries.slice(0, 10).map(country => `
                        <tr>
                            <td>${country.country}</td>
                            <td>${country.count.toLocaleString()}</td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        `;
    },

    renderRecentVisits(visits) {
        const container = document.getElementById('recent-visits');
        if (visits.length === 0) {
            container.innerHTML = '<p class="no-data">No visits recorded</p>';
            return;
        }
        container.innerHTML = `
            <table>
                <thead>
                    <tr>
                        <th>Time</th>
                        <th>IP</th>
                        <th>City</th>
                        <th>Country</th>
                        <th>Page</th>
                        <th>Referrer</th>
                    </tr>
                </thead>
                <tbody>
                    ${visits.map(visit => `
                        <tr>
                            <td>${new Date(visit.timestamp).toLocaleString()}</td>
                            <td><code>${visit.ip || 'Unknown'}</code></td>
                            <td>${visit.city || 'Unknown'}</td>
                            <td>${visit.country || 'Unknown'}</td>
                            <td><code>${visit.page || '/'}</code></td>
                            <td>${visit.referrer === 'Direct' ? 'Direct' : (visit.referrer || 'Direct').substring(0, 40)}</td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        `;
    },

    exportAnalytics() {
        if (typeof Analytics === 'undefined') {
            Admin.toast('Analytics script not loaded', true);
            return;
        }

        const data = Analytics.exportData();
        const json = JSON.stringify(data, null, 2);
        const blob = new Blob([json], { type: 'application/json' });
        const url = URL.createObjectURL(blob);

        const a = document.createElement('a');
        a.href = url;
        a.download = `analytics-export-${new Date().toISOString().split('T')[0]}.json`;
        a.click();

        URL.revokeObjectURL(url);
        Admin.toast('Analytics data exported!');
    },

    clearAnalytics() {
        if (!confirm('Are you sure you want to clear all analytics data? This cannot be undone.')) {
            return;
        }

        if (typeof Analytics === 'undefined') {
            Admin.toast('Analytics script not loaded', true);
            return;
        }

        Analytics.clearData();
        Admin.toast('Analytics data cleared');
        this.refreshAnalytics();
    }
};
