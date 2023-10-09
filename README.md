


# React + TypeScript + Vite

To run the project on your local machine follow the steps:

1- First of all, clone the project into a desired directory by running the `git clone https://github.com/LuigiSS97/qventus-test.git` command at your prefered terminal.

2- Select the "qventus" folder by running a `cd qventus` command right after the clone and then install the project dependencies by running the `npm install` command.

3- If the dependency installation succeded, please run a `npm run dev` to run the project locally and go to the url address http://127.0.0.1:5 173 in your prefered browser.

 ##### To run the tests, run `npm test` in the project's root folder.

### Technical notes
There're some technical decisions that are worth to be explained, it will be accomplished by the following topics aiming to clarify some points of attention: 

 - The Password validator accepts only a config Array with two possible keys: 
	 - description: which is the condition label to be rendered
	 - validation: which is can be a regular expression or function to be executed on the validation process.	
 
 #### Performance and structure
 The core functionality of the component, which is the password validation, is isolated into a separate custom hook for both performance and test purposes. Having this business logic separate from the component allows us to set a good amount of test cases without an excess of lines of code at the PasswordValidator.test.tsx. In addition to that, setting a function outside the functional component prevents the function to be executed on every component mount. 
	 I chose to set a throttle functionality to its business logic due to the performance issues that iterating the `config` prop throught every letter typing of the input. Since it's necessary to compare the current input value with the conditions passed throught props.
	The `useValidation` hook makes use of `useMemo` react hook to cache its value and prevent it to update on every rerender, it just updates itself when it's dependencies are changed.
	These choices were made to have the best performance and a declarative and readable code. It's recommended to use profiler from react dev tools extention to perceive that only the validation lines to be changed are rerendered.

#### Layout
The test was made with SASS at mobile first principle. It's currently fully responsive.
	
### Future improvements
It's completely possible to expand the component to embrace other functionalities and not being just for pasword validation but a specific form that might be necessary to be repeated in the project. The current project is already adaptable to validate not just passwords, since it accepts any validation function. It would only be necessary to change it's markup and style to fit new business rules.
The throttle was supposed to be just a suggestion but it seems appropriate on a performance point of view to prioritize its implementation and show some lifecycle and perfomance enhancement techniques, since it would have a big performance cost to verify  the conditions with all letter typing in the input. 

### Thank you for the opportunity and I'm hoping we can discuss more on the next stage of the hiring process :D
	

