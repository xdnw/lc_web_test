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
const TestSuspense = lazy(() => import("./pages/testinput/testsuspense"));
const CustomTable = lazy(() => import("./pages/custom_table/TablePage"));

function PageLoading() {
  return (
    <div className="flex items-center justify-center w-screen h-screen">
      <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-b-4 border-blue-500 border-opacity-50"></div>
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <Suspense fallback={<PageLoading />}>
        <Routes>
          <Route path="" element={<Splash />} />
          <Route path="*" element={<PageView>
            <Routes>
              <Route path="/home" element={<Home />} />
              <Route path="/guild_member" element={<LoggedInRoute><GuildMember /></LoggedInRoute>} />
              <Route path="/unregister" element={<LoggedInRoute><Unregister /></LoggedInRoute>} />
              <Route path="/guild_select" element={<LoggedInRoute><GuildPicker /></LoggedInRoute>} />

              <Route path="/announcements" element={<LoggedInRoute><Announcements /></LoggedInRoute>} />
              <Route path="/announcement/:id" element={<LoggedInRoute><Announcement /></LoggedInRoute>} />
              <Route path="/announcement" element={<LoggedInRoute><Announcements /></LoggedInRoute>} />

              <Route path="/commands" element={<CommandsPage />} />
              <Route path="/command" element={<CommandsPage />} />
              <Route path="/command/:command" element={<CommandPage />} />
              <Route path="/placeholders/:placeholder" element={<PlaceholdersList />} />

              <Route path="/balance" element={<BalancePage />} />
              <Route path="/balance/:category" element={<BalancePage />} />
              <Route path="/records" element={<Records />} />
              <Route path="/raid/:nation" element={<RaidSection />} />
              <Route path="/raid" element={<RaidSection />} />

              <Route path="/login" element={<LoginPickerPage />} />
              <Route path="/login/:token" element={<LoginPage />} />
              <Route path="/oauth2" element={<OAuth2 />} />
              <Route path="/logout" element={<LogoutPage />} />
              <Route path="/nation_picker" element={<NationPicker />} />
              <Route path="/register" element={<Unregister />} />

              {/*Tables*/}
              <Route path="/custom_table" element={<CustomTable />} />
              <Route path="/view_table" element={<ViewTable />} />

              {/*graphs*/}
              <Route path="/col_mil_graph" element={<ColMilGraph />} />
              <Route path="/col_tier_graph" element={<ColTierGraph />} />
              <Route path="/edit_graph/:type" element={<ParamEditGraph />} />
              <Route path="/edit_graph" element={<ParamEditGraph />} />
              <Route path="/view_graph/:type" element={<ParamViewGraph />} />
              <Route path="/view_graph" element={<ParamEditGraph />} />



              {/* testing pages */}
              <Route path="/test" element={<TestSuspense />} />
              <Route path="/view_command/:command" element={<ViewCommand />} />
              <Route path="/alliance/:alliance" element={<Alliance />} />
              <Route path="/multi/:nation" element={<MultiBuster />} />
              <Route path="/multi_v2/:nation" element={<MultiV2 />} />

              {/* <Route path="/admin" element={<Admin />} /> */}
              {/* <Route path="/autocomplete" element={<AutoComplete />} /> */}
              {/* <Route path="/auto2" element={<AutoComplete2 />} /> */}
              {/* <Route path="/dnd" element={<DndTest />} /> */}
              {/* <Route path="/testinput" element={<TestInput />} /> */}
            </Routes>
          </PageView>} />
        </Routes>
      </Suspense>
    </Router>
  );
}

const LoggedInRoute = ({ children }: { children: ReactNode }) => {
  return hasToken() ? children : <LoginPickerPage />;
};