import fs from "fs";
import { parse as csvParse } from "csv-parse";
import { inject, injectable } from "tsyringe";
import { CategoriesRepository } from "@modules/cars/infra/typeorm/repositories/CategoriesRepository";

interface IImportCategories {
  name: string;
  description: string;
}

@injectable()
export class ImportCategoryUseCase {
  constructor(
    @inject("CategoriesRepository")
    private categoriesRepository: CategoriesRepository
  ) {}

  loadCategories(file: Express.Multer.File): Promise<IImportCategories[]> {
    return new Promise((resolve, reject) => {
      const stream = fs.createReadStream(file.path);
      const categories: IImportCategories[] = [];

      const parseFile = csvParse();

      stream.pipe(parseFile);

      parseFile
        .on("data", async (line) => {
          const [name, description] = line;
          categories.push({
            name,
            description,
          });
        })
        .on("end", () => {
          fs.promises.unlink(file.path);
          resolve(categories);
        })
        .on("error", (error) => {
          reject(error);
        });
    });
  }

  async execute(file: Express.Multer.File) {
    const categories = await this.loadCategories(file);
    categories.map(async (category) => {
      const { name, description } = category;
      const existCategory = await this.categoriesRepository.findByName(name);
      console.log(existCategory);
      if (!existCategory) {
        await this.categoriesRepository.create({ name, description });
      }
    });
  }
}
