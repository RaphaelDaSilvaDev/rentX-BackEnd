import { Request, Response } from "express";
import { container } from "tsyringe";
import { CreateSpecificationUseCase } from "./CreateSpecificationUseCase";

export class CreateSpecificationController {
  async hadle(request: Request, response: Response) {
    const { name, description } = request.body;
    const createSpecificationUseCase = container.resolve(CreateSpecificationUseCase);
    await createSpecificationUseCase.execute({ description, name });
    return response.status(201).send();
  }
}
