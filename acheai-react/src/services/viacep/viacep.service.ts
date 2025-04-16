import { z } from 'zod';
import { viacepResponseSchema } from './viacep.validators';

export class ViacepAPI {
  static async getCep(
    cep: string,
  ): Promise<z.infer<typeof viacepResponseSchema>> {
    const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);

    const data = await response.json();

    return viacepResponseSchema.parse(data);
  }
}
