<p align="center">
  <a href='https://www.omise.co'>
    <img src="https://cdn.omise.co/assets/omise-logo/omise-wordmark.png" width="300" />
  </a>
</p>
<br />


**Tamboon React** is a code challenge for GO.X frontend developer.

## Scenario
Once upon a time.. nope!  
So here, you have been temporarily hired by Omise and assigned to work on the charity donation project which the previously assigned front-end developer and designer got the urgent matters to solve, so they will not be able to finish the project on time..

Fortunately, the API server is already done. You will need to grab on the requirements and complete the project while ensuring the application to have great engineering and well-design ✨

![tamboon-react-screenshot](https://git.omise.co/storage/user/56/files/b407c6c4-ad09-11e7-8792-dc5b468333df)

## Mission
Well, grap your guns, stock up your food and bring down your armor. We gonna need it for tonight!  
**Here are the tasks you must complete:**

- [ ] Complete the application according to the design (image above).
- [ ] Complete these features that are not in the design (you have freedom to design and position to display).
  - Display all donation amount.
  - Display a message when paid.
- [ ] Make the donation feature works correctly.
  - Amount in all donations should be displayed correctly despite users close and come back later.
  - Database (db.json) should have the new valid data when paid.
- [ ] Production quality code is expected
- [ ] Unit tests is a must  
- [ ] Refactor the code to be more readable and enhance reusability.
- [ ] Use only [styled-component](https://www.styled-components.com/) for styling part.
- [ ] Display well in most modern browser (Google Chrome, Safari, Firefox).


#### Bonus
- [ ] Supporting different screen sizes (responsive).
- [ ] Write unit tests with [jest](https://facebook.github.io/jest/).

## Rules
Desire to win the war? Well, to make it a little more fun, please remember that

**You cannot:**
- Change existing behaviors.
- Change the API server.
- Change from JS to other languages.

**In the other hand, feel free to:**
- Improve the design to have better UI and UX.
- Re-organize the codebase.
- Create new modules/methods/components.
- Modify existing code.
- Add new packages.
- Update `webpack` config.
- Take reasonable time to complete the challenge, no need to rush.
- Edit `README.md` to add documentation. What have you done or how to run or test your app?


**Note**: You can see design inside folder `resources`.


## Surprise us!
Ready to surprise us what you have done? Email your changes as a [git format-patch](https://git-scm.com/docs/git-format-patch) to theesit@omise.co
Please remember that your patch must consist of multiple separate commits. Your commit message must communicate clearly what has been done in each commit.

If you notice more bugs in the original implementation you can add fixes for those as well. You won't be penalized if you don't. However we ask you not to add more features than the one given in the mission list.

Let's rock! :metal:

# Documentation intro
Written documentation along with the code are useful for software projects to run smoother and easier future enhancements. The purpose of this documention is to describe how the implementation has been done and comprehensive explanation to the steps. The main objective is to follow the rules mentioned above and fufill the mission within reaseonable timeframe. 

# Update packages
Firstly install the packages with yarn
```
yarn install
```
Upgrade the packages to latest using yarn
```
yarn upgrade --latest
```
> The most important upgrade here is react. Start from react 16.8 onwards, we can use the latest features from react such as useState, useEffect, etc.

upgrade to babel 7
```
npx babel-upgrade --write
```
add webpack-cli package
```
yarn add --dev webpack-cli
```
# Optimize logic
When the number of transactions grow, it is not ideal to calculate the total amount from the array of transactions. Should usee the total amount replied from backend API. 

> Additional property to keep track of the total donation. 
```
  "overall": {
    "totalDonation": 0,
    "currency": "THB"
  },
```
Since the json-server is not capable of processing the data, the calculation will still be done at the frontend. However, it is easier to migrate to more powerful backend server. 

# Reduck
Restructure the redux with reduck style to be extensible
Another advantage of redux strucuture is that all the tests and logic implementation are located in the same folder. Easier for developer to visualize the folder structure. 
> The main inspiration comes from https://github.com/erikras/ducks-modular-redux

# View folder structure
The folder is structured based on readability and reusability.
Page consists of one or more feature components according to the project requirements. 
The features components are developed in mind with reusability. 

```
views
├── components
│   └── features
│       └── feature1
|           └── components 
└── pages
    └── Page1
```  
# Code splitting and optimization

Lazy loading is used here code splitting and performance optimization. 
Added higher order component (errorBoundary) to prevent the application from crush by handling error at the individual component level. Error boundaries catch errors during rendering, in lifecycle methods, and in constructors of the whole tree below them.

# Redux hook
From react 16.8, react has introduced the react hook which is really neat trick to get rid of class components and all the stateless components to be accessible to lifecycle methods. To accomodate that, redux has been updated into similar hooks as well such as useSelector and useDispatch. In this update, the redux connect component has been updated with hook manner. 

# Deployment
## Prerequisite
- docker
- docker-compose

Docker-compose has been used for deployment
There are 2 docker containers has been used. 
1. json-server
2. tamboon application

To start, simply run the below command
```docker-compose up -d```

To stop, simply run the below command. It will take care of the auto clean process of docker images as well. 
```docker-compose down -v --rmi all --remove-orphans```

# Future enhancement
* Dedicated backend API
* CRUD operation to charities
* Admin login
* Charity volunteer
* Charity fund goal