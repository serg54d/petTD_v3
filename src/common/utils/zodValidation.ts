// common/utils/zodValidation.ts
import { z } from "zod";

/**
 * Безопасная валидация Zod с логированием ошибок в консоль
 */
export const safeZodParse = <T>(
  schema: z.ZodSchema<T>,
  data: unknown,
  context: string = "Unknown context"
): T | null => {
  const result = schema.safeParse(data);

  if (!result.success) {
    console.group(`🔍 Zod Validation Error - ${context}`);
    console.log("Invalid data:", data);
    console.table(
      result.error.issues.map((issue) => ({
        path: issue.path.join("."),
        code: issue.code,
        message: issue.message,
      }))
    );
    console.groupEnd();
    return null;
  }

  return result.data;
};

/**
 * Валидация массива данных
 */
export const safeZodParseArray = <T>(
  schema: z.ZodSchema<T>,
  data: unknown[],
  context: string = "Unknown context"
): T[] => {
  const result: T[] = [];

  data.forEach((item, index) => {
    const validated = safeZodParse(schema, item, `${context}[${index}]`);
    if (validated) {
      result.push(validated);
    }
  });

  if (result.length !== data.length) {
    console.warn(
      `⚠️  Some items failed validation in ${context}. Valid: ${result.length}/${data.length}`
    );
  }

  return result;
};
