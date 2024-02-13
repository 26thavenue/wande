import { auth } from '@clerk/nextjs';

const { userId } : { userId: string | null } = auth();