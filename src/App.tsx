import "./App.css";
import { HashRouter as Router, Route, Routes } from "react-router-dom";
import React, { Suspense, ReactNode, lazy } from "react";
import { hasToken } from "@/utils/Auth.ts";
import ReactGA from "react-ga4";
import "react-data-grid/lib/styles.css";

// Initialize Google Analytics
ReactGA.initialize(process.env.GTAG_ID as string);
// Lazy-loaded components
const Splash = lazy(() => import("./pages/splash"));
const CommandsPage = lazy(() => import("./pages/commands"));
const CommandPage = lazy(() => import("./pages/command"));
const PageView = lazy(() => import("./components/layout/page-view"));
const PlaceholdersList = lazy(() => import("@/pages/ph_list"));
const Home = lazy(() => import("./pages/home"));
const OAuth2 = lazy(() => import("./pages/oauth2"));
const LoginPage = lazy(() => import("./pages/login"));
const LogoutPage = lazy(() => import("./pages/logout"));
const NationPicker = lazy(() => import("@/pages/nation_picker"));
const GuildPicker = lazy(() => import("@/pages/guild_picker"));
const LoginPickerPage = lazy(() => import("@/pages/login_picker"));
const Unregister = lazy(() => import("@/pages/unregister"));
const GuildMember = lazy(() => import("@/pages/guild_member"));
const Announcements = lazy(() => import("@/pages/announcements"));
const Announcement = lazy(() => import("@/pages/announcement"));
const BalancePage = lazy(() => import("@/pages/balance"));
const Records = lazy(() => import("@/pages/records"));
const ViewTable = lazy(() => import("@/pages/view_table"));
const RaidSection = lazy(() => import("./pages/raid"));
const ColMilGraph = lazy(() => import("./pages/graphs/col_mil_graph"));
const ColTierGraph = lazy(() => import("./pages/graphs/col_tier_graph"));
const ParamEditGraph = lazy(() => import("./pages/graphs/edit_graph"));
const ParamViewGraph = lazy(() => import("./pages/graphs/view_graph"));
const Alliance = lazy(() => import("./pages/a2/alliance/alliance"));
const MultiBuster = lazy(() => import("./pages/a2/nation/multi"));
const MultiV2 = lazy(() => import("./pages/a2/nation/multi_2"));
const ViewCommand = lazy(() => import("./pages/command/view_command"));
const CustomTable = lazy(() => import("./pages/custom_table/TablePage"));

function PageLoading() {
  return (
    <div className="flex items-center justify-center w-screen h-screen">
      <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-b-4 border-blue-500 border-opacity-50"></div>
    </div>
  );
}

const LoggedInRoute = ({ children }: { children: ReactNode }) => {
  return hasToken() ? children : <LoginPickerPage />;
};

// Define routes as configuration objects to prevent ESLint jsx-in-jsx warnings
// while maintaining performance (only created once at initialization)
const routeConfigs = [
  // Home and user management
  { key: "home", path: "/home", element: Home, protected: false },
  { key: "guild_member", path: "/guild_member", element: GuildMember, protected: true },
  { key: "unregister", path: "/unregister", element: Unregister, protected: true },
  { key: "guild_select", path: "/guild_select", element: GuildPicker, protected: true },

  // Announcements
  { key: "announcements", path: "/announcements", element: Announcements, protected: true },
  { key: "announcement_id", path: "/announcement/:id", element: Announcement, protected: true },
  { key: "announcement", path: "/announcement", element: Announcements, protected: true },

  // Commands
  { key: "commands", path: "/commands", element: CommandsPage, protected: false },
  { key: "command", path: "/command", element: CommandsPage, protected: false },
  { key: "command_detail", path: "/command/:command", element: CommandPage, protected: false },
  { key: "placeholders", path: "/placeholders/:placeholder", element: PlaceholdersList, protected: false },

  // Balance and records
  { key: "balance", path: "/balance", element: BalancePage, protected: false },
  { key: "balance_category", path: "/balance/:category", element: BalancePage, protected: false },
  { key: "records", path: "/records", element: Records, protected: false },
  { key: "raid_nation", path: "/raid/:nation", element: RaidSection, protected: false },
  { key: "raid", path: "/raid", element: RaidSection, protected: false },

  // Authentication
  { key: "login", path: "/login", element: LoginPickerPage, protected: false },
  { key: "login_token", path: "/login/:token", element: LoginPage, protected: false },
  { key: "oauth2", path: "/oauth2", element: OAuth2, protected: false },
  { key: "logout", path: "/logout", element: LogoutPage, protected: false },
  { key: "nation_picker", path: "/nation_picker", element: NationPicker, protected: false },
  { key: "register", path: "/register", element: Unregister, protected: false },

  // Tables
  { key: "custom_table", path: "/custom_table", element: CustomTable, protected: false },
  { key: "view_table", path: "/view_table", element: ViewTable, protected: false },

  // Graphs
  { key: "col_mil_graph", path: "/col_mil_graph", element: ColMilGraph, protected: false },
  { key: "col_tier_graph", path: "/col_tier_graph", element: ColTierGraph, protected: false },
  { key: "edit_graph_type", path: "/edit_graph/:type", element: ParamEditGraph, protected: false },
  { key: "edit_graph", path: "/edit_graph", element: ParamEditGraph, protected: false },
  { key: "view_graph_type", path: "/view_graph/:type", element: ParamViewGraph, protected: false },
  { key: "view_graph", path: "/view_graph", element: ParamEditGraph, protected: false },

  // WIP commands
  { key: "view_command", path: "/view_command/:command", element: ViewCommand, protected: false },
  { key: "alliance", path: "/alliance/:alliance", element: Alliance, protected: false },
  { key: "multi", path: "/multi/:nation", element: MultiBuster, protected: false },
  { key: "multi_v2", path: "/multi_v2/:nation", element: MultiV2, protected: false },
];

// Generate routes from configuration
const appRoutes = routeConfigs.map(config => {
  const Element = config.element;
  return (
    <Route
      key={config.key}
      path={config.path}
      element={config.protected ? <LoggedInRoute><Element /></LoggedInRoute> : <Element />}
    />
  );
});

// Define splash route
const splashRoute = <Route path="" element={<Splash />} />;

// Wrap content in PageView
const mainContentRoute = (
  <Route
    path="*"
    element={
      <PageView>
        <Routes>
          {appRoutes}
        </Routes>
      </PageView>
    }
  />
);

export default function App() {
  return (
    <Router>
      <Suspense fallback={<PageLoading />}>
        <Routes>
          {splashRoute}
          {mainContentRoute}
        </Routes>
      </Suspense>
    </Router>
  );
}