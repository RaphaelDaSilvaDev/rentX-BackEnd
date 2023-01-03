import { Request, Response } from "express";
import { container } from "tsyringe";
import { ListCategoryUseCase } from "./ListCategoryUseCase";

export class ListCategoryController {
  async handle(request: Request, response: Response) {
    const listCategoryUseCase = container.resolve(ListCategoryUseCase);
    const categories = await listCategoryUseCase.execute();
    return response.json(categories);
  }
}
