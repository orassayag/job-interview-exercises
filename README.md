# Job Interview Exercises

A comprehensive collection of job interviews, coding tests, and practical exercises with extra files to practice and improve on various development subjects.

Built in May 2021. This repository serves as an archive of past interview assignments, take-home tests, and algorithm challenges, helping software engineers study, prepare, and level up their skills for technical interviews.

## Features

- 💼 **Extensive Collection** - Over 38 distinct job interview assignments and coding tasks (`job-1`, `job-2`, etc.)
- 💻 **Real-World Scenarios** - Practical take-home tests covering diverse web development requirements
- 🧪 **Algorithms & Data Structures** - Focus on subjects that frequently appear in technical screens and need improvement
- 📦 **Ready to Run** - Most exercises contain their own configuration files (like `package.json`, `.eslintrc`)

## Project Structure

```text
job-interview-exercises-github/
├── jobs/                   # The core collection of job interview tasks
│   ├── job-1/              # Individual job test with its own package.json & src/
│   ├── job-2/
│   ├── ...
│   └── job-39/             # Over 38 different challenges
├── jobs.rar                # Compressed backup of the jobs directory
├── misc/                   # Miscellaneous scripts and resources
│   └── add_next_job.txt    # Utility for adding new jobs
├── .vscode/                # VS Code workspace settings
├── CONTRIBUTING.md         # Contribution guidelines
├── LICENSE                 # MIT License details
└── README.md               # Project documentation
```

## Technology Usage

Since this repo compiles many different interview tests, you will encounter varying tech stacks depending on the specific job directory:
- **Node.js**: Many exercises feature standard `package.json` configurations.
- **JavaScript / TypeScript**: Core languages used to solve logical challenges and build the UI or backend.
- **ESlint & Similar Tools**: Formatting and linting standards implemented per test.

## Getting Started

### Prerequisites
- Node.js (Latest stable version recommended)
- Git

### Installation

1. Clone the repository:
```bash
git clone https://github.com/orassayag/job-interview-exercises.git
cd job-interview-exercises-github
```

2. Navigate to a specific job exercise:
```bash
cd jobs/job-1
```

3. Install dependencies (if a `package.json` exists in that particular exercise):
```bash
npm install
```

4. Run the test/app:
```bash
npm start   # or npm test, depending on the exercise's package.json scripts
```

## Contributing

Contributions to this project are [released](https://help.github.com/articles/github-terms-of-service/#6-contributions-under-repository-license) to the public under the [project's open source license](LICENSE).

Everyone is welcome to contribute by suggesting new interview exercises or optimizations for the existing ones. Adding an exercise? Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct and the process for submitting pull requests.

## Author

* **Or Assayag** - *Initial work* - [orassayag](https://github.com/orassayag)
* Or Assayag <orassayag@gmail.com>
* GitHub: https://github.com/orassayag
* StackOverflow: https://stackoverflow.com/users/4442606/or-assayag?tab=profile
* LinkedIn: https://linkedin.com/in/orassayag

## License

This project is licensed under the [MIT License](LICENSE).