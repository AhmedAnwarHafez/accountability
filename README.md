## Setup
```sh
npm i
npx prisma db push
npm run seed
npm run dev
```

## User stories

As a new student, I want to be able to scan a QR code and fill in my name and cohort.

As a current student, I want to be able to scan a QR code and immediately be signed in so that the teachers know that I'm in the space.

As a non-student, I want to be able to scan a QR code and only insert my name.

As an admin, I want to be able to see who a list of all students in the current cohort and know who signed in and not.
