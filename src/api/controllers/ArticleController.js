const res = require("express/lib/response");
const ArticleModel = require("../models/ArticleModel");
const { validationResult } = require("express-validator");

class ArticleController {
  static async createArticle(req) {
    const { title, authorId, images, content, colaboratorIds } = req.body;
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      const err = new Error();
      err.code = 400;
      throw err;
    }

    const Article = new ArticleModel({
      title,
      authorId,
      images,
      content,
      colaboratorIds,
    });

    const response = await Article.save();

    return {
      data: response,
      message: `'${response.title}' was successfully created`,
    };
  }

  static async getArticles(req) {
    const limit = +req.query.limit || 10;
    const page = +req.query.page || 1;
    // const orderBy = req.query.page;

    const response = await ArticleModel.find()
      .limit(limit)
      .skip(limit * (page - 1))
      .sort({
        title: "asc",
      });
    const count = await ArticleModel.countDocuments();

    let result = {
      records: [],
      pagination: {},
    };

    result["records"] = response;
    result["pagination"] = {
      currentPage: page,
      totalPages: Math.ceil(count / limit),
    };

    return result;
  }

  static async getArticle(req) {
    const _id = req.params.id;

    const response = await ArticleModel.findById(_id);

    if (!response) {
      const err = new Error(`Id not found`);
      err.code = 404;
      throw err;
    } else {
      return response;
    }
  }

  static async updateArticle(req) {
    const id = req.params.id;
    const { title, authorId, images, content, colaboratorIds } = req.body;

    let article = await ArticleModel.findById(id);
    if (!article) {
      const error = new Error(`Id not found`);
      error.code = 404;
      throw error;
    } else {
      let new_article = article;
      new_article["title"] = title;
      new_article["authorId"] = authorId;
      new_article["images"] = images;
      new_article["content"] = content;
      new_article["colaboratorIds"] = colaboratorIds;

      const response = await new_article.save();
      return {
        data: response,
        message: `'${response.title}' was successfully updated`,
      };
    }
  }

  static async deleteArticle(req) {
    const id = req.params.id;
    // const article = await ArticleModel.findById(id);
    const response = await ArticleModel.findByIdAndRemove(id);
    if (!response) {
      const error = new Error(`Id not found`);
      error.code = 404;
      throw error;
    } else {
      return { message: `'${response.title}' was successfully deleted` };
    }
  }
}

module.exports = ArticleController;
