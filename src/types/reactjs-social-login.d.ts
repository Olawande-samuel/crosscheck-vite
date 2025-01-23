/* eslint-disable @typescript-eslint/no-explicit-any */
declare module "reactjs-social-login" {
	import { ReactNode } from "react";

	export interface LoginSocialProps {
		provider: string;
		appId: string;
		onResolve?: (response: any) => void;
		onReject?: (error: any) => void;
		children?: ReactNode;
	}

	export const LoginSocial: React.ComponentType<LoginSocialProps>;
}
