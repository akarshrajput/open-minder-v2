const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema(
  {
    heading: {
      type: String,
      required: [true, "Blog must have heading."],
      trim: true,
      minlength: [10, "Heading must have more than 10 characters."],
      maxlength: [100, "Heading must have less than 100 characters."],
    },
    description: {
      type: String,
      required: [true, "Blog must have description."],
      trim: true,
      minlength: [20, "Description must have more than 20 characters."],
      maxlength: [300, "Description must have less than 300 characters."],
    },
    featuredImage: {
      type: "String",
      default: "default-blog.jpg",
      // required: [true, "Blog must have a featured photo"],
    },
    content: {
      type: String,
      required: [true, "Blog must have a Content."],
      minlength: [100, "Blog must have more than 100 characters."],
      maxlength: [20000, "Blog must have less than 20,000 characters."],
    },
    author: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
    },
    createdAt: {
      type: Date,
      default: Date.now(),
    },
    viewsArr: {
      type: [
        {
          type: mongoose.Schema.ObjectId,
          ref: "User",
        },
      ],
      // select: false,
      default: [],
    },
    tags: {
      type: [
        {
          type: String,
          minlength: [2, "Tag is not valid."],
          maxlength: [20, "Tag is not valid."],
        },
      ],
      validate: [
        {
          validator: function (tags) {
            return tags && tags.length > 0;
          },
          message: "Blog must have at least one tag.",
        },
      ],
      required: true,
    },
    category: {
      type: String,
      required: [true, "Blog must have a category."],
      enum: [
        "Adventure",
        "Analysis",
        "Apps",
        "Architecture",
        "Arts",
        "Automotive",
        "Beauty",
        "Book Reviews",
        "Business",
        "Cars and Bikes",
        "Career Advice",
        "Celebrity News",
        "Concerts",
        "Crime",
        "Cryptocurrency",
        "Culture",
        "Current Affairs",
        "Cybersecurity",
        "DIY",
        "DIY Projects",
        "Diversity and Inclusion",
        "Economics",
        "Education",
        "Education Trends",
        "Entertainment",
        "Environment",
        "Entrepreneurship",
        "Family",
        "Fashion",
        "Family",
        "Fitness",
        "Food",
        "Gadgets",
        "Gaming",
        "Gaming Reviews",
        "Global Issues",
        "Health",
        "History",
        "Home and Garden",
        "Home Decor",
        "Human Rights",
        "Immigration",
        "Inspirational Stories",
        "International Relations",
        "Investigative Journalism",
        "LGBTQ+ Issues",
        "Law and Legal",
        "Lifestyle",
        "Literature",
        "Luxury Living",
        "Meditation",
        "Medical Breakthroughs",
        "Men's Issues",
        "Mental Health",
        "Men's Issues",
        "Motivation",
        "Movie Reviews",
        "Music",
        "Nature",
        "News",
        "Nutrition",
        "Opinion",
        "Parenting",
        "Parenting Tips",
        "Personal Development",
        "Personal Finance",
        "Philanthropy",
        "Philosopher's Corner",
        "Photography",
        "Poetry",
        "Politics",
        "Real Estate",
        "Recipes",
        "Refugees",
        "Relationships",
        "Religion",
        "Robotics",
        "Science",
        "Social Media",
        "Spirituality",
        "Sports",
        "Startups",
        "Streaming Services",
        "Success Stories",
        "Technology",
        "Technology Trends",
        "Travel",
        "Travel Guides",
        "Trends",
        "TV Shows",
        "Volunteering",
        "Weather",
        "Wellness",
        "Wildlife",
        "Women's Rights",
        "Yoga",
      ],
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

blogSchema.virtual("readTime").get(function () {
  const wordsPerMinute = 120;
  const wordCount = this.content.split(/\s+/).length;
  const readTimeMinutes = Math.ceil(wordCount / wordsPerMinute);
  return `${readTimeMinutes}`;
});

blogSchema.virtual("views").get(function () {
  const viewsArr = this.get("viewsArr");
  const numberofViews = viewsArr.length;
  return Number(`${numberofViews}`);
});

blogSchema.pre(/^find/, function (next) {
  this.populate({
    path: "author",
    select: "name username email verified",
  }).populate({ path: "viewsArr", select: "name -_id" });
  next();
});

const Blog = mongoose.model("Blog", blogSchema);
module.exports = Blog;