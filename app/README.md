# To Do App

- DEPENDANCIES: nanoid for generating IDs for each task swapped by implementation of Firebase DB. Organisation of the Firebase config into a firebase.js file.

- ARCHITECTURE
    * main.jsx: For initial App testing I hardcoded DATA with nanoid(). Removed the implementation by the time Firebase was deployed.
    * App.jsx: the main component
    * Form.jsx: component for adding new tasks
    * Todolist.jsx: component to display each task - no default task displayed. Personal choice, the UI should appear empty, ready to be used!
    * FilterButton.jsx: component for filtering tasks

APP COMPONENT:
The App component will manage state for tasks and filtering.

Define the JSX layout in a static way and hardcoded data to provide a general overview of the final outcome, which means having a form with an input for writing tasks, an array of buttons to filter out tasks, a heading that tells the user how many tasks reamin, and 3 static tasks in an unordered list.

I decided to create the reference to the firestore collection "todo" in the App for maintainability. In this way I can use the todoRefCollection either for all the CRUD functionalities.

the FILTER_MAP object defines the filtering functions as key-value pairs, to then being extracted into an array by the Object constructor method "keys". An alternative approach could have been using React.State with callbacks fn defining a switch statement and filtering logic, but i decided to avoid it to "overcrowd"
the code template, keep it more clean, simple to comprehend, maintainable.

useEffect fetches the data to listen for real time updated from Firestore using "snapshot".



FORM COMPONENT:
it's responsable for adding new tasks and handle the submission and updates.

handleSubmit() makes sure something is written in the input field before submission; whereas handleChange() takes the value of the input field and updates the form state.


TODOLIST COMPONENT:
it's responsible of rendering each task with option to edit and delete, and toggle checkbox for completion.

it handles two types of state; isUpdated which is a boolean state to flip whenever the task is in update mode displaying an editing interface, whereas newName is a state to manage the input value of the task's new name during editing mode.

The component takes props from <App/>, such as task ID, name, isCompleted, toggleTaskCompleted fn, delete and update task.

handleChange is the event handler that updates the newName state when the user types something in the edit field.
handleSubmit is the event handler that submits the new name, it calls the updatedTask fn passing id and new name of the new entry value, clears the input and exits edit mode.

The component conditionally renders two different templates based on the isUpdated state. If the isUpdated is true it renders a a form for updating task's name with save and cancel buttons. Else, if isUpdated is false, it renders the task name, a checkbox for toggling completion and buttons for editing and deleting the task.

For accessibility reasons and accomplishing the eventual wish of keyboard users to manage focus targeting specific DOM elements using just tab button, I discovered useRef() comes handy. It creates an object with a single property: "current". Ref can store any value I want, including DOM references, and I can hook it up at any time. Creating two constants one for the edit field and one for the edit button both with useRef set to null, I am allowing the references to be empty until they are attached to their DOM elements. The input and button semantic elements both declare ref={the constants holding useRef()}.
Once React mount the component both the values are null, but after the component rendered clicking the Edit button will render the input element. This happens because the ref is populated only after the component renders, and clicking the Edit button causes the component to re-render. Thus, useEffect will take care of this, managing the focus depending on whether the task is in edit mode (isUpdated === true) or not. It focuses on the edit input field when editing and the Edit button when not editing.

FILTER BUTTON:
Component that manages the visibility of tasks based on their status (all, active, completed).

It takes props from <App/>.
* name: string value indicating the name of the filter ("all", "active", "completed").
* isPressed: boolean indicating the current filter button is active (related to filter state).
* setFilter: to update the current filter in the parent component <App/>.

The aria-pressed attribute is dynamically set based on the isPressed prop. This attribute is used for accessibility purposes to indicate whether the button is currently pressed (active).
The button's text is set to the name prop, displaying the name of the filter.
The onClick() event handler on the button calls setFilter() with this button's name as an argument. This action updates the current filter state in the <App/> component, which in turn controls which tasks are displayed based on the selected filter.

Multiple <FilterButton/> components are created, each corresponding to a different way to filter the tasks (e.g., showing all tasks, only active tasks, or only completed tasks).