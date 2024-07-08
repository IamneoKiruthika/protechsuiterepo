import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { QueryClient, QueryClientProvider } from 'react-query';
import store from '../store';
import Login from '../Components/Login';
import '@testing-library/jest-dom/extend-expect';
import axios from 'axios';
import Signup from '../Components/Signup';
import ErrorPage from '../Components/ErrorPage';
import HomePage from '../Components/HomePage';

import ViewProject from '../EmployeeComponents/EmployeeViewProject';
import EmployeeNavbar from '../EmployeeComponents/EmployeeNavbar';
import ManagerNavbar from '../ManagerComponents/ManagerNavbar';

import ManagerViewProject from '../ManagerComponents/ViewProject';
import ProjectForm from '../ManagerComponents/ProjectForm';

jest.mock('axios');

// Setup QueryClient
const queryClient = new QueryClient();

describe('Login Component', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  const renderLoginComponent = (props = {}) => {
    return render(
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <Router>
            <Login {...props} />
          </Router>
        </QueryClientProvider>
      </Provider>
    );
  };

  
  test('frontend_login_component_renders_the_with_login_heading', () => {
    renderLoginComponent();

  
    const loginHeadings = screen.getAllByText(/Login/i);
    expect(loginHeadings.length).toBeGreaterThan(0);

  });


  test('frontend_login_component_displays_validation_messages_when_login_button_is_clicked_with_empty_fields', () => {
    renderLoginComponent();

    fireEvent.click(screen.getByRole('button', { name: /Login/i }));

    expect(screen.getByText('Email is required')).toBeInTheDocument();
    expect(screen.getByText('Password is required')).toBeInTheDocument();
  });

   
});
describe('Signup Component', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  const renderSignupComponent = (props = {}) => {
    return render(
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <Router>
            <Signup {...props} />
          </Router>
        </QueryClientProvider>
      </Provider>
    );
  };
  test('frontend_signup_component_renders_with_signup_heading', () => {
    renderSignupComponent();

    const signupHeadings = screen.getAllByText(/Signup/i);
   expect(signupHeadings.length).toBeGreaterThan(0);

  });

  test('frontend_signup_component_displays_validation_messages_when_submit_button_is_clicked_with_empty_fields', () => {
    renderSignupComponent();

    fireEvent.click(screen.getByRole('button', { name: /Submit/i }));

    expect(screen.getByText('User Name is required')).toBeInTheDocument();
    expect(screen.getByText('Email is required')).toBeInTheDocument();
    expect(screen.getByText('Mobile Number is required')).toBeInTheDocument();
    expect(screen.getByText('Password is required')).toBeInTheDocument();
    expect(screen.getByText('Confirm Password is required')).toBeInTheDocument();
  });

  test('frontend_signup_component_displays_error_when_passwords_do_not_match', () => {
    renderSignupComponent();

    fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: 'password123' } });
    fireEvent.change(screen.getByPlaceholderText('Confirm Password'), { target: { value: 'password456' } });
    fireEvent.click(screen.getByRole('button', { name: /Submit/i }));

    expect(screen.getByText('Passwords do not match')).toBeInTheDocument();
  });
});
describe('ErrorPage Component', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  const renderErrorComponent = (props = {}) => {
    return render(
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <Router>
            <ErrorPage {...props} />
          </Router>
        </QueryClientProvider>
      </Provider>
    );
  };
  test('frontend_errorpage_component_renders_with_error_heading', () => {
    renderErrorComponent();
    const headingElement = screen.getByText(/Oops! Something Went Wrong/i);
    expect(headingElement).toBeInTheDocument();
  });

  test('frontend_errorpage_component_renders_with_error_content', () => {
    renderErrorComponent();
    const paragraphElement = screen.getByText(/Please try again later./i);
    expect(paragraphElement).toBeInTheDocument();
  });
});
describe('Home Component', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  const renderHomeComponent = (props = {}) => {
    return render(
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <Router>
            <HomePage {...props} />
          </Router>
        </QueryClientProvider>
      </Provider>
    );
  };
  test('frontend_home_component_renders_with_heading', () => {
    renderHomeComponent();
    const headingElement = screen.getAllByText(/ProTechSuite/i);
    expect(headingElement.length).toBeGreaterThan(0);

  });
  test('frontend_home_component_renders_with_contact_us', () => {
    renderHomeComponent();
    const headingElement = screen.getAllByText(/Contact Us/i);
    expect(headingElement.length).toBeGreaterThan(0);

  });


});


describe('Employee - ViewProject Component', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  const renderViewProjectComponent = (props = {}) => {
    return render(
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <Router>
            <ViewProject {...props} />
          </Router>
        </QueryClientProvider>
      </Provider>
    );
  };

  test('frontend_employee_view_project_component_renders_with_table', () => {
    renderViewProjectComponent();

    const tableElement = screen.getByRole('table');
    expect(tableElement).toBeInTheDocument();
 });
 test('frontend_employee_view_project_component_renders_with_logout', () => {
  renderViewProjectComponent();

  const logout = screen.getAllByText('Logout');
  expect(logout.length).toBeGreaterThan(0);
});
  test('frontend_employee_view_project_component_renders_with_heading', () => {
    renderViewProjectComponent();
    // Check table data cells
    const heading = screen.getAllByText('Projects');
    expect(heading.length).toBeGreaterThan(0); // Check if there are any table data cells rendered
  });
});

describe('EmployeeNav Component', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  const renderEmployeeNavbarComponent = (props = {}) => {
    return render(
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <Router>
            <EmployeeNavbar {...props} />
          </Router>
        </QueryClientProvider>
      </Provider>
    );
  };

  test('frontend_employee_navbar_component_renders_with_home', () => {
    renderEmployeeNavbarComponent();
    const home = screen.getAllByText('Home');
    expect(home.length).toBeGreaterThan(0);
  });
  test('frontend_employee_navbar_component_renders_with_projects', () => {
    renderEmployeeNavbarComponent();
    const projects = screen.getAllByText('Projects');
    expect(projects.length).toBeGreaterThan(0);
  });

  test('frontend_employee_navbar_component_renders_with_logout', () => {
    renderEmployeeNavbarComponent();
    const projects = screen.getAllByText('Logout');
    expect(projects.length).toBeGreaterThan(0);
  });

});
describe('ManagerNav Component', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  const renderManagerNavbarComponent = (props = {}) => {
    return render(
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <Router>
            <ManagerNavbar {...props} />
          </Router>
        </QueryClientProvider>
      </Provider>
    );
  };

  test('frontend_manager_navbar_component_renders_with_home', () => {
    renderManagerNavbarComponent();
    const home = screen.getAllByText('Home');
    expect(home.length).toBeGreaterThan(0);
  });
  test('frontend_manager_navbar_component_renders_with_project', () => {
    renderManagerNavbarComponent();
    const projects = screen.getAllByText('Project');
    expect(projects.length).toBeGreaterThan(0);
  });

  test('frontend_manager_navbar_component_renders_with_logout', () => {
    renderManagerNavbarComponent();
    const projects = screen.getAllByText('Logout');
    expect(projects.length).toBeGreaterThan(0);
  });

});

describe('Manager - ViewProject Component', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  const renderManagerViewProject = (props = {}) => {
    return render(
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <Router>
            <ManagerViewProject {...props} />
          </Router>
        </QueryClientProvider>
      </Provider>
    );
  };

  test('frontend_manager_view_project_component_renders_with_table', () => {
    renderManagerViewProject();

    const tableElement = screen.getByRole('table');
    expect(tableElement).toBeInTheDocument();
 });
 test('frontend_manager_view_project_component_renders_with_logout', () => {
  renderManagerViewProject();

  const logout = screen.getAllByText('Logout');
  expect(logout.length).toBeGreaterThan(0);
});
  test('frontend_manager_view_project_component_renders_with_heading', () => {
    renderManagerViewProject();
    // Check table data cells
    const heading = screen.getAllByText('Projects');
    expect(heading.length).toBeGreaterThan(0); // Check if there are any table data cells rendered
  });
});
describe('ProjectForm Component', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  const renderProjectFormComponent = (props = {}) => {
    return render(
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <Router>
            <ProjectForm {...props} />
          </Router>
        </QueryClientProvider>
      </Provider>
    );
  };

  test('frontend_project_form_component_renders_with_create_heading', () => {
    renderProjectFormComponent();

    const createHeading = screen.getByText('Create New Project');
    expect(createHeading).toBeInTheDocument();
  });


  test('frontend_project_form_component_displays_validation_messages_when_submit_button_is_clicked_with_empty_fields', () => {
    renderProjectFormComponent();

    fireEvent.click(screen.getByRole('button', { name: /Add Project/i }));

    expect(screen.getByText('Project Title is required')).toBeInTheDocument();
    expect(screen.getByText('Project Description is required')).toBeInTheDocument();
    expect(screen.getByText('Start Date is required')).toBeInTheDocument();

  });
 
  test('frontend_project_form_component_renders_with_logout', () => {
    renderProjectFormComponent();
    const logout = screen.getAllByText('Logout');
    expect(logout.length).toBeGreaterThan(0);
  });

});