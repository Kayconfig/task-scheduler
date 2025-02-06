import { SetMetadata } from '@nestjs/common';

export const IS_PUBLIC_METADATA_KEY = 'public';
export const Public = () => SetMetadata(IS_PUBLIC_METADATA_KEY, true);
