export default function DashboardLoading() {
  return (
    <div className="dashboardHome" aria-busy="true" aria-label="Dashboard yükleniyor">
      <div className="loadingHeader">
        <span className="skeleton skeletonEyebrow" />
        <span className="skeleton skeletonTitle" />
        <span className="skeleton skeletonText" />
      </div>
      <div className="sourceBar"><span>Veriler hazırlanıyor…</span></div>
      <div className="kpiGrid">
        {Array.from({ length: 4 }).map((_, index) => (
          <div className="kpiCard loadingCard" key={index}>
            <span className="skeleton skeletonIcon" />
            <span className="skeleton skeletonValue" />
            <span className="skeleton skeletonText" />
          </div>
        ))}
      </div>
      <div className="insightGrid">
        <div className="dashboardPanel loadingPanel" />
        <div className="dashboardPanel loadingPanel" />
      </div>
    </div>
  );
}
