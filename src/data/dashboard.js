export const states = [
  {
    id: 1,
    title: "Total Sales",
    value: "$10800",
    new: "$50",
    iconClass: "icon-coupon",
      roles: ["teacher"]

  },
  {
    id: 1,
    title: "Revenue",
    value: "$10800",
    new: "$50",
    iconClass: "icon-coupon",
      roles: ["admin"]

  },
  {
    id: 2,
    title: "Total Courses",
    value: 3759,
    new: 40,
    iconClass: "icon-play-button",
      roles: [ "student"]

  },
  {
    id: 2,
    title: "Reviews",
    value: 3759,
    new: 40,
    iconClass: "icon-play-button",
      roles: ["admin"]

  },
  {
    id: 3,
    title: "Total Bookings By Students",
    value: 129786,
    new: 90,
    iconClass: "icon-graduate-cap",
      roles: ["teacher"]

  },
  {
    id: 3,
    title: "Totals Student",
    value: 129786,
    new: 90,
    iconClass: "icon-graduate-cap",
      roles: ["admin"]

  },
  {
    id: 4,
    title: "Total Instructors",
    value: 22786,
    new: 290,
    iconClass: "icon-online-learning",
    roles: ["admin", "student"]

  },
];

export const Revenue = [
  {
    id: 1,
    title: "Total Revenue",
    value: "$10800",
    new: "$50",
    iconClass: "icon-coupon",
      roles: ["admin", "teacher"]

  },
  {
    id: 2,
    title: "Total Enrollments",
    value: 3759,
    new: 40,
    iconClass: "icon-play-button",
      roles: ["admin", "teacher", "student"]

  },
  
];

export const coursesData = [
  {
    id: 1,
    imageSrc: "/assets/img/coursesCards/1.png",
    authorImageSrc: "/assets/img/general/avatar-1.png",
    title: "Learn Figma - UI/UX Design Essential Training",
    rating: 4.3,
    ratingCount: 1991,
    lessonCount: 6,
    duration: 320,
    level: "Beginner",
    progress: 20,
    completed: 25,
    originalPrice: 199,
    discountedPrice: 79,
    category: "Design",
    state: "Popular",

    viewStatus: "Good",
    difficulty: "Easy",
    status: "Finished",
  },
  {
    id: 2,
    imageSrc: "/assets/img/coursesCards/2.png",
    authorImageSrc: "/assets/img/general/avatar-1.png",
    title: "Complete Python Bootcamp From Zero to Hero in Python",
    rating: 4.7,
    ratingCount: 1991,
    lessonCount: 6,
    duration: 410,
    level: "Beginner",
    progress: 20,
    completed: 25,
    originalPrice: 189,
    discountedPrice: 89,
    category: "Programming",
    popular: true,
    new: true,
    state: "Fetured",
    viewStatus: "Low",
    difficulty: "Easy",
    status: "Not enrolled",
  },
  {
    id: 3,
    imageSrc: "/assets/img/coursesCards/3.png",
    authorImageSrc: "/assets/img/general/avatar-1.png",
    title: "Angular - The Complete Guide (2022 Edition)",
    rating: 4.5,
    ratingCount: 1991,
    lessonCount: 6,
    duration: 480,
    level: "Beginner",
    progress: 20,
    completed: 25,
    originalPrice: 249,
    discountedPrice: 129,
    category: "Programming",
    state: "Trending",
    viewStatus: "Great",
    difficulty: "Easy",
    status: "Finished",
  },
  {
    id: 4,
    imageSrc: "/assets/img/coursesCards/4.png",
    authorImageSrc: "/assets/img/general/avatar-1.png",
    title: "The Ultimate Drawing Course Beginner to Advanced",
    rating: 4.2,
    ratingCount: 1991,
    lessonCount: 6,
    duration: 370,
    level: "Beginner",
    progress: 20,
    completed: 25,
    originalPrice: 179,
    discountedPrice: 99,
    category: "Art",
    state: "Trending",
    viewStatus: "Good",
    difficulty: "Easy",
    status: "Not enrolled",
  },
  {
    id: 5,
    imageSrc: "/assets/img/coursesCards/5.png",
    authorImageSrc: "/assets/img/general/avatar-1.png",
    title: "Photography Masterclass: A Complete Guide to Photography",
    rating: 3.8,
    ratingCount: 1991,
    lessonCount: 6,
    duration: 250,
    level: "Beginner",
    progress: 20,
    completed: 25,
    originalPrice: 169,
    discountedPrice: 79,
    category: "Photography",
    state: "Popular",
    viewStatus: "Low",
    difficulty: "Meduium",
    status: "Finished",
  },
  {
    id: 6,
    imageSrc: "/assets/img/coursesCards/7.png",
    imageAlt: "image",
    rating: 4.6,
    textRatingCount: 1991,
    courseTitle: "Complete Blender Creator: Learn 3D Modelling for Beginners",
    lessonCount: 6,
    duration: 430,
    level: "Beginner",
    progress: 20,
    completed: 25,
    authorImageSrc: "/assets/img/general/avatar-1.png",
    authorName: "Ali Tufan",
    originalPrice: 209,
    discountedPrice: 99,
    category: "Animation",
    state: "Fetured",
    viewStatus: "Good",
    difficulty: "Meduium",
    status: "Not enrolled",
  },
  {
    id: 7,
    imageSrc: "/assets/img/coursesCards/8.png",
    imageAlt: "image",
    rating: 3.5,
    textRatingCount: 1991,
    courseTitle: "The Complete Financial Analyst Training & Investing Course",
    lessonCount: 6,
    duration: 490,
    level: "Beginner",
    progress: 20,
    completed: 25,
    authorImageSrc: "/assets/img/general/avatar-1.png",
    authorName: "Ali Tufan",
    originalPrice: 299,
    discountedPrice: 149,
    category: "Business",
    state: "Popular",
    viewStatus: "Great",
    difficulty: "Hard",
    status: "Finished",
  },
  {
    id: 8,
    imageSrc: "/assets/img/coursesCards/9.png",
    imageAlt: "image",
    rating: 4.8,
    textRatingCount: 1991,
    courseTitle: "Photography Masterclass: A Complete Guide to Photography",
    lessonCount: 6,
    duration: 500,
    level: "Beginner",
    progress: 20,
    completed: 25,
    authorImageSrc: "/assets/img/general/avatar-1.png",
    authorName: "Ali Tufan",
    originalPrice: 219,
    discountedPrice: 109,
    category: "Photography",
    state: "Fetured",
    viewStatus: "Medium",
    difficulty: "Meduium",
    status: "Not enrolled",
  },
  {
    id: 9,
    imageSrc: "/assets/img/coursesCards/10.png",
    imageAlt: "image",
    rating: 3.9,
    textRatingCount: 1991,
    courseTitle: "Complete Python Bootcamp From Zero to Hero in Python",
    lessonCount: 6,
    duration: 390,
    level: "Beginner",
    progress: 20,
    completed: 25,
    authorImageSrc: "/assets/img/general/avatar-1.png",
    authorName: "Ali Tufan",
    originalPrice: 199,
    discountedPrice: 89,
    category: "Programming",
    state: "Popular",
    viewStatus: "Great",
    difficulty: "Hard",
    status: "Finished",
  },
  {
    id: 10,
    imageSrc: "/assets/img/coursesCards/11.png",
    imageAlt: "image",
    rating: 4.2,
    textRatingCount: 1991,
    courseTitle: "Angular - The Complete Guide (2022 Edition)",
    lessonCount: 6,
    duration: 300,
    level: "Beginner",
    progress: 20,
    completed: 25,
    authorImageSrc: "/assets/img/general/avatar-1.png",
    authorName: "Ali Tufan",
    originalPrice: 189,
    discountedPrice: 99,
    category: "Writing",
    state: "Trending",
    viewStatus: "Medium",
    difficulty: "Meduium",
    status: "Not enrolled",
  },
  {
    id: 11,
    imageSrc: "/assets/img/coursesCards/12.png",
    imageAlt: "image",
    rating: 5.0,
    textRatingCount: 1991,
    courseTitle: "Web Design for Beginners: Real World Coding in HTML & CSS",
    lessonCount: 6,
    duration: 440,
    level: "Beginner",
    progress: 20,
    completed: 25,
    authorImageSrc: "/assets/img/general/avatar-1.png",
    authorName: "Ali Tufan",
    originalPrice: 209,
    discountedPrice: 119,
    category: "Design",
    state: "Popular",
    viewStatus: "Medium",
    difficulty: "Hard",
    status: "Finished",
  },
  // Add more objects as needed
];

export const mediaUpload = [
  {
    id: 1,
    imgSrc: "/assets/img/dashboard/media/1.png",
    uploadLabel: "Course thumbnail*",
    uploadPlaceholder: "Cover-1.png",

    description:
      "Upload your course image here. It must meet our course image quality standards to be accepted. Important guidelines: 750x440 pixels; .jpg, .jpeg,. gif, or .png. no text on the image.",
  },
  {
    id: 2,
    imgSrc: "/assets/img/dashboard/media/2.png",
    uploadLabel: "Video URL*",
    uploadPlaceholder: "Video-1.mp3",

    description:
      "Enter a valid video URL. Students who watch a well-made promo video are 5X more likely to enroll in your course.",
  },
  // Add more form section objects as needed
];

export const activeUsers = [
  {
    id: 1,
    name: "Cody Fisher",
    image: "/assets/img/dashboard/online-users/1.png",
  },
  {
    id: 2,
    name: "Courtney Henry",
    image: "/assets/img/dashboard/online-users/2.png",
  },
];

export const timeline = [
  {
    id: 1,
    image: "/assets/img/dashboard/actions/1.png",
    date: "Monday, 21 October 2024",
    title: "What do you think about course should be completed",
    link1: "Your Road to Better Photography",
    link2: "Add submission",
    time: "17:52",
  },
  {
    id: 2,
    image: "/assets/img/dashboard/actions/2.png",
    date: "Monday, 21 October 2024",
    title: "What do you think about course should be completed",
    link1: "Your Road to Better Photography",
    link2: "Add submission",
    time: "17:52",
  },
];

export const courseDiscussion = [
  {
    key: 1,
    title: `Depiction in foreign language films`,
    author1Img: "/assets/img/misc/2.png",
    author2Img: "/assets/img/misc/2.png",
    author1: `Heather Reyes`,
    date1: `10 Nov 2014`,
    author2: `Jeffrey Sanders`,
    date2: `16 Feb 2017`,
    count: 5,
  },
  {
    key: 2,
    title: `Depiction in foreign language films`,
    author1Img: "/assets/img/misc/2.png",
    author2Img: "/assets/img/misc/2.png",
    author1: `Heather Reyes`,
    date1: `10 Nov 2014`,
    author2: `Jeffrey Sanders`,
    date2: `16 Feb 2017`,
    count: 5,
  },
];

export const grades = [
  {
    id: 1,
    name: "Jenny Wilson",
    email: "alitfn@example.com",
    avatar: "/assets/img/avatars/small/1.png",
  },
  {
    id: 2,
    name: "Jenny Wilson",
    email: "alitfn@example.com",
    avatar: "/assets/img/avatars/small/1.png",
  },
  {
    id: 3,
    name: "Jenny Wilson",
    email: "alitfn@example.com",
    avatar: "/assets/img/avatars/small/1.png",
  },
  {
    id: 4,
    name: "Jenny Wilson",
    email: "alitfn@example.com",
    avatar: "/assets/img/avatars/small/1.png",
  },
  {
    id: 5,
    name: "Jenny Wilson",
    email: "alitfn@example.com",
    avatar: "/assets/img/avatars/small/1.png",
  },
  {
    id: 6,
    name: "Jenny Wilson",
    email: "alitfn@example.com",
    avatar: "/assets/img/avatars/small/1.png",
  },
  {
    id: 7,
    name: "Jenny Wilson",
    email: "alitfn@example.com",
    avatar: "/assets/img/avatars/small/1.png",
  },
];

export const messageList = [
  {
    id: 1,
    name: "Group Name",
    title: "lorem ,lorem, lorem",
    avatar: "/assets/img/avatars/small/1.png",
    time: "35 mins",
    isOnline: true,
    timezone: "19:00",
    group: true,

  },
  {
    id: 2,
    name: "Jane Cooper",
    title: "Head of Development",
    avatar: "/assets/img/avatars/small/2.png",
    time: "35 mins",
    notificationCount: 5,
    isOnline: false,
        timezone: "19:00",
            group: false,

  },
  {
    id: 3,
    name: "Arlene McCoy",
    title: "Head of Development",
    avatar: "/assets/img/avatars/small/3.png",
    time: "35 mins",
    notificationCount: 2,
    isOnline: true,
        timezone: "19:00",
                    group: false,

  },
  {
    id: 4,
    name: "Albert Flores",
    title: "Head of Development",
    avatar: "/assets/img/avatars/small/4.png",
    time: "35 mins",
    isOnline: false,
        timezone: "19:00",
                    group: false,

  },
  {
    id: 5,
    name: "Cameron Williamson",
    title: "Head of Development",
    avatar: "/assets/img/avatars/small/5.png",
    time: "35 mins",
    notificationCount: 3,
    isOnline: true,
        timezone: "19:00",
                    group: false,

  },
  {
    id: 6,
    name: "Kristin Watson",
    title: "Head of Development",
    avatar: "/assets/img/avatars/small/6.png",
    time: "35 mins",
    isOnline: true,
        timezone: "19:00",
                    group: false,

  },
  {
    id: 7,
    name: "Annette Black",
    title: "Head of Development",
    avatar: "/assets/img/avatars/small/7.png",
    time: "35 mins",
     isOnline: true,
         timezone: "19:00",
                     group: false,

  },
  {
    id: 8,
    name: "Jacob Jones",
    title: "Head of Development",
    avatar: "/assets/img/avatars/small/8.png",
    time: "35 mins",
    isOnline: true,
        timezone: "19:00",
                    group: false,

  },
  // Add more objects for each item's data
];

export const partcipents = [
  {
    id: 1,
    name: "Heather Reyes",
    date: "10 Nov 2014",
    role: "Student",
    team: "Team South",
    duration: "1 year 31 days",
    imgSrc: "/assets/img/misc/2.png",

  },
  {
    id: 2,
    name: "John Doe",
    date: "15 Jan 2015",
    role: "Teacher",
    team: "Team North",
    duration: "2 years 15 days",
    imgSrc: "/assets/img/misc/2.png",

  },
  {
    id: 3,
    name: "Jane Smith",
    date: "22 Mar 2016",
    role: "intructor",
    team: "Team East",
    duration: "3 years 281 days",
    imgSrc: "/assets/img/misc/2.png",

  },
  {
    id: 4,
    name: "David Johnson",
    date: "5 Jul 2017",
    role: "Student",
    team: "Team West",
    duration: "4 years 2 days",
    imgSrc: "/assets/img/misc/2.png",

  },
  {
    id: 5,
    name: "Emily Davis",
    date: "12 Sep 2018",
    role: "Teacher",
    team: "Team South",
    duration: "5 years 298 days",
    imgSrc: "/assets/img/misc/2.png",

  },
];


