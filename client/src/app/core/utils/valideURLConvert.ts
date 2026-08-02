// utils/valid-url-convert.ts
export function validURLConvert(name: string): string {
    return name
      ?.toString()
      .replaceAll(' ', '-')
      .replaceAll(',', '-')
      .replaceAll('&', '-');
  }