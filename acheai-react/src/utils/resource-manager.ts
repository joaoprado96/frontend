import { UseMutationResult, UseQueryResult } from '@tanstack/react-query';
import { ZodObject, ZodRawShape } from 'zod';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Any = any;

export interface Resource {
  hooks: {
    useList: () => UseQueryResult<Any[]>;
    useRead: (id: number) => UseQueryResult<Any>;
    useCreate: () => UseMutationResult<Any, Any, Any>;
    useUpdate: () => UseMutationResult<Any, Any, Any>;
    useDelete: () => UseMutationResult<Any, Any, Any>;
  };
  validators: {
    create: ZodObject<ZodRawShape>;
    update: ZodObject<ZodRawShape>;
  };
}

export class ResourceManager extends Map<string, Resource> {
  constructor() {
    super();
  }
}

export default new ResourceManager();
