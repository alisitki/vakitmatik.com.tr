export type DateRange = {
  label: string;
  startDate: string;
  endDate: string;
};

export type Money = {
  micros: number;
  currencyCode: string;
};

export type AdsSummary = {
  dateRange: DateRange;
  currencyCode: string;
  costMicros: number;
  clicks: number;
  impressions: number;
  ctr: number;
  averageCpcMicros: number;
  phoneLeads: number;
  emailLeads: number;
  totalLeads: number;
  costPerLeadMicros: number | null;
};

export type CampaignRow = {
  id: string;
  name: string;
  status: string;
  dailyBudgetMicros: number;
  costMicros: number;
  clicks: number;
  impressions: number;
  ctr: number;
  averageCpcMicros: number;
  conversions: number;
  costPerLeadMicros: number | null;
};

export type KeywordRow = {
  text: string;
  campaignName: string;
  adGroupName: string;
  matchType: string;
  status: string;
  costMicros: number;
  clicks: number;
  impressions: number;
  ctr: number;
  averageCpcMicros: number;
  conversions: number;
};

export type SearchTermRow = {
  term: string;
  campaignName: string;
  adGroupName: string;
  matchType: string;
  status: string;
  costMicros: number;
  clicks: number;
  impressions: number;
  ctr: number;
  averageCpcMicros: number;
  conversions: number;
  recommendation: string | null;
};

export type AdsDashboardData = {
  account: {
    name: string;
    customerId: string;
    loginCustomerId: string | null;
    timeZone: string;
    currencyCode: string;
  };
  today: AdsSummary;
  yesterday: AdsSummary;
  last7Days: AdsSummary;
  campaigns: CampaignRow[];
  keywords: KeywordRow[];
  searchTerms: SearchTermRow[];
  conversionActions: {
    resourceName: string;
    id: string;
    name: string;
    status: string;
    kind: "phone" | "email" | "other";
  }[];
};

export type SearchConsoleMetricRow = {
  keys: string[];
  clicks: number;
  impressions: number;
  ctr: number;
  position: number;
};

export type SeoUrlStatus = {
  url: string;
  title: string;
  clicks: number;
  impressions: number;
  ctr: number;
  position: number;
  inspection: {
    verdict: string | null;
    coverageState: string | null;
    indexingState: string | null;
    lastCrawlTime: string | null;
    googleCanonical: string | null;
    userCanonical: string | null;
    pageFetchState: string | null;
    cachedAt: string | null;
    error: string | null;
  };
};

export type SearchConsoleDashboardData = {
  siteUrl: string;
  dateRange: DateRange;
  availableDataThrough: string | null;
  summary: {
    clicks: number;
    impressions: number;
    ctr: number;
    position: number;
  };
  topQueriesByClicks: SearchConsoleMetricRow[];
  topQueriesByImpressions: SearchConsoleMetricRow[];
  topPages: SearchConsoleMetricRow[];
  seoUrls: SeoUrlStatus[];
};

export type AnalyticsSummary = {
  dateRange: DateRange;
  totalPageviews: number;
  oldSitePageviews: number;
  oldSiteTrackedVisits: number | null;
  oldSiteTrackedVisitors: number | null;
  oldSiteTrackingUnavailableReason: string | null;
  directPageviews: number;
  topReferrers: {
    referrerHostname: string;
    pageviews: number;
  }[];
};

export type AnalyticsDashboardData = {
  today: AnalyticsSummary;
  yesterday: AnalyticsSummary;
  last7Days: AnalyticsSummary;
};

export type DailyReport = {
  reportDate: string;
  generatedAt: string;
  ads: AdsSummary;
  analytics: AnalyticsDashboardData;
  topKeyword: KeywordRow | null;
  weakKeyword: KeywordRow | null;
  topSearchTerm: SearchTermRow | null;
  negativeSuggestions: SearchTermRow[];
  seo: SearchConsoleDashboardData;
  actions: string[];
};

export type DataState<T> =
  | {
      ok: true;
      data: T;
    }
  | {
      ok: false;
      error: string;
    };
