# Introduction

Hi there! first and foremost, thank you so much for taking your time to review my challenge. I'm gonna try to briefly explain my thought process implementing the task and the tools I've used to.

## Initial setup and tooling

My initial idea was to prepare the provided boilerplate with some foundation configs to be used during the actual implementation. In this first iteration, my goal was to prepare the project to support ESLint, prettier, an alias to the imports and a basic proxy to the mock api, so I could easily access it afterwards and avoid any CORS issues.

Right after, I started setting up Redux and Redux Query, as they would be my main state management library. This part was really fast (as RTK is always a cake to setup) and I've quickly added the query to the colors endpoint and the mutation to submit the form.

After that I've setup React Router and some initial structure of the files/pages I wanted to have. These changed a couple times during the implementation.

## Components

I wanted to use styled-components as my main CSS library but I also didn't want to reinvent the wheel for the components. My idea was to use a UI library alongisde SC that could handle the core components (inputs, selects, buttons). I've opted to go with Ant Design, since it's a lightweight and simple to setup and use. I also used their form components in order to manage validations and input types.

If I haven't chosen Antd, I'd probably use Formik and Yup, or even react-hook-form + Yup, but since Antd had a good form handling, I've chosen to use what's out of the box.

## Multi step form

For the multi step form handling I wanted to make sure all the data was persistent between the routes and even after refreshes. In order to achieve this, I'm relying on a localStorage storing strategy, managed by a custom hook and integrated with the form. In order to keep the form as a single instance through the entire flow, I've opted to create it as a context.

## Unit tests

Once I finished the actual implementation, I've setup React Testing Library and started to create the initial tests. I didn't want to create any type of "content"/"render" tests because there are no actual value on those IMO. The main goal of the tests is to ensure the form validations are in place and working as expected and the user interactions are correctly implemented.

