import "./App.css"
import {HashRouter as Router, Route, Routes} from 'react-router-dom';
import Splash from './pages/splash';
import CommandsPage from './pages/commands';
import Admin from "./pages/admin";
import CommandPage from "./pages/command";
import PageView from "./components/layout/page-view";
import TestInput from "./pages/testinput";
import AutoComplete from "./pages/testinput/autocomplete";
import AutoComplete2 from "./pages/testinput/autocomplete2";
import PlaceholdersList from "@/pages/ph_list";
import Home from "./pages/home";
import OAuth2 from "./pages/oauth2";
import LoginPage from "./pages/login";
import LogoutPage from "./pages/logout";
import CustomTable from "@/pages/custom_table";
import NationPicker from "@/pages/nation_picker";
import GuildPicker from "@/pages/guild_picker";
import LoginPickerPage from "@/pages/login_picker";
import {ReactNode} from "react";
import Unregister from "@/pages/unregister";
import GuildMember from "@/pages/guild_member";
import {hasToken} from "@/utils/Auth.ts";
import Announcements from "@/pages/announcements";
import {Announcement} from "@/pages/announcement";
import BalancePage from "@/pages/balance";
import Records from "@/pages/records";
import ViewTable from "@/pages/view_table";
import RaidSection from "./pages/raid";
import {ColMilGraph} from "./pages/graphs/col_mil_graph";
import {ColTierGraph} from "./pages/graphs/col_tier_graph";
import {ParamEditGraph} from "./pages/graphs/edit_graph";
import {ParamViewGraph} from "./pages/graphs/view_graph";
import DndTest from "./components/dnd/dnd";
import Alliance from "./pages/a2/alliance/alliance";
import MultiBuster from "./pages/a2/nation/multi";
import MultiV2 from "./pages/a2/nation/multi_2";
import ViewCommand from "./pages/command/view_command";
import ReactGA from "react-ga4";

// process.env.GTAG_ID
ReactGA.initialize(process.env.GTAG_ID as string);

export default function App() {
  return (
    <Router>
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
          {/*<Route path="/alliance" element={<Alliance />} />*/}
          <Route path="/view_command/:command" element={<ViewCommand />} />
          <Route path="/alliance/:alliance" element={<Alliance />} />
          <Route path="/multi/:nation" element={<MultiBuster />} />
          <Route path="/multi_v2/:nation" element={<MultiV2 />} />


          <Route path="/admin" element={<Admin />} />
          <Route path="/autocomplete" element={<AutoComplete />} />
          <Route path="/auto2" element={<AutoComplete2 />} />
          <Route path="/dnd" element={<DndTest />} />
          <Route path="/testinput" element={<TestInput />} />
        </Routes>
        </PageView>} />
    </Routes>
  </Router>
  );
}

const LoggedInRoute = ({ children }: { children: ReactNode }) => {
    return hasToken() ? children : <LoginPickerPage />;
};