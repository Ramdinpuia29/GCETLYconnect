import React, { useEffect, lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import Moment from "react-moment";

import { ColorSchemeProvider, MantineProvider } from "@mantine/core";
import { useLocalStorage } from "@mantine/hooks";
import { NotificationsProvider } from "@mantine/notifications";

import PrivateRoute from "./PrivateRoute";

import Header from "./components/header/header.component";
import Footer from "./components/footer/footer.component";
import Spinner from "./components/Spinner/Spinner.component";
import ErrorBoundary from "./components/error-boundary/error-boundary.component";
import Alert from "./components/alert/alert.component";
import store from "./redux/store";
import { loadUser } from "./redux/user/user-actions";
import setAuthToken from "./utils/setAuthToken";

// import LoginPage from "./pages/login/login.component";
// import RegisterPage from "./pages/register/register.component";
// import DashboardPage from "./pages/dashboard/dashboard.component";
// import SearchStudentsPage from "./pages/students/students.component";

import "./App.css";

//Components
const HomePage = lazy(() => import("./pages/homepage/homepage.component"));
const RegisterPage = lazy(() => import("./pages/register/register.component"));
const LoginPage = lazy(() => import("./pages/login/login.component"));
const DashboardPage = lazy(() =>
  import("./pages/dashboard/dashboard.component")
);
const FormProfile = lazy(() =>
  import("./pages/form-profile/form-profile.component")
);
const AddEducationPage = lazy(() =>
  import("./pages/education/education.component")
);
const AddExperiencePage = lazy(() =>
  import("./pages/experience/experience.component")
);
const EditExperience = lazy(() =>
  import("./pages/edit-experience/edit-experience.component")
);
const EditEducation = lazy(() =>
  import("./pages/edit-education/edit-education.component")
);
const SearchStudentsPage = lazy(() =>
  import("./pages/students/students.component")
);
const StudentProfile = lazy(() =>
  import("./pages/student-profile/student-profile.component")
);
const PostsPage = lazy(() => import("./pages/posts/posts.component"));
const PostPage = lazy(() => import("./pages/post/post.component"));
const SendMessagePage = lazy(() =>
  import("./pages/send-message/send-message.component")
);
const MessagesPage = lazy(() => import("./pages/messages/messages.component"));
const MessagePage = lazy(() => import("./pages/message/message.component"));
const CreatePostPage = lazy(() => import("./pages/create-post/create-post"));

Moment.globalLocal = true;

const App = () => {
  const [colorScheme, setColorScheme] = useLocalStorage({
    key: "mantine-color-scheme",
    defaultValue: "dark",
    getInitialValueInEffect: true,
  });

  const toggleColorScheme = () =>
    setColorScheme((current) => (current === "dark" ? "light" : "dark"));
  useEffect(() => {
    setAuthToken(localStorage.token);
    store.dispatch(loadUser());
  }, []);

  return (
    <>
      <ColorSchemeProvider
        colorScheme={colorScheme}
        toggleColorScheme={toggleColorScheme}
      >
        <MantineProvider
          withGlobalStyles
          withNormalizeCSS
          theme={{
            colorScheme,
            defaultRadius: "md",
            fontFamily: "Barlow Semi Condensed, sans-serif",
            fontFamilyMonospace: "Source Code Pro, monospace",
            headings: {
              fontFamily: "Barlow Semi Condensed, sans-serif",
              fontWeight: "700",
            },
            loader: "oval",
          }}
        >
          <NotificationsProvider autoClose={5000}>
            <Header />
            <Alert />
            <ErrorBoundary>
              <Suspense fallback={<Spinner />}>
                <Routes>
                  <Route exact path="/" element={<HomePage />} />
                  <Route exact path="/register" element={<RegisterPage />} />
                  <Route exact path="/login" element={<LoginPage />} />
                  <Route
                    exact
                    path="/students"
                    element={<SearchStudentsPage />}
                  />
                  <Route
                    exact
                    path="/profile/:id"
                    element={<StudentProfile />}
                  />
                </Routes>
                <PrivateRoute
                  exact
                  path="/dashboard"
                  component={DashboardPage}
                  element={<DashboardPage />}
                />
                <PrivateRoute
                  exact
                  path="/create-profile"
                  element={<FormProfile />}
                />
                <PrivateRoute
                  exact
                  path="/edit-profile"
                  component={FormProfile}
                  element={<FormProfile />}
                />
                <PrivateRoute
                  exact
                  path="/add-experience"
                  component={AddExperiencePage}
                  element={<AddExperiencePage />}
                />
                <PrivateRoute
                  exact
                  path="/add-education"
                  component={AddEducationPage}
                  element={<AddEducationPage />}
                />
                <PrivateRoute
                  exact
                  path="/edit-experience/:exp_id"
                  component={EditExperience}
                  element={<EditExperience />}
                />
                <PrivateRoute
                  exact
                  path="/edit-education/:edu_id"
                  component={EditEducation}
                  element={<EditEducation />}
                />
                <PrivateRoute
                  exact
                  path="/posts"
                  component={PostsPage}
                  element={<PostsPage />}
                />
                <PrivateRoute
                  exact
                  path="/createPost"
                  component={CreatePostPage}
                  element={<CreatePostPage />}
                />
                <PrivateRoute
                  exact
                  path="/posts/:id"
                  component={PostPage}
                  element={<PostPage />}
                />
                <PrivateRoute
                  exact
                  path="/send-message/:id"
                  component={SendMessagePage}
                  element={<SendMessagePage />}
                />
                <PrivateRoute
                  exact
                  path="/messages"
                  component={MessagesPage}
                  element={<MessagesPage />}
                />
                <PrivateRoute
                  exact
                  path="/messages/:id"
                  component={MessagePage}
                  element={<MessagePage />}
                />
              </Suspense>
            </ErrorBoundary>
            <Footer />
          </NotificationsProvider>
        </MantineProvider>
      </ColorSchemeProvider>
    </>
  );
};

export default App;
