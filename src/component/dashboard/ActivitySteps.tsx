import { PropsWithChildren } from "react";
import { cn } from "./utils";
import { Steps } from "antd";
import { Play } from "lucide-react";
import { ImStack } from "react-icons/im";
import { BsCheck2Circle, BsCreditCard } from "react-icons/bs";

interface IconProps extends PropsWithChildren {
	isActive: boolean;
}
function IconWrapper({ children, isActive }: IconProps) {
	return (
		<div
			className={cn(
				"size-[50px] rounded-full flex justify-center items-center",
				isActive ? "bg-[#0092E0]" : "bg-[#D7DADB]"
			)}
		>
			{children}
		</div>
	);
}
const ActivitySteps = ({ activeStep }: { activeStep: number }) => {
	return (
		<div className="mx-auto sm:max-w-[674px]">
			<Steps
				labelPlacement="vertical"
				current={activeStep}
				items={[
					{
						title: (
							<span className="text-xs leading-3 text-[#707070] font-normal text-center">
								START
							</span>
						),
						icon: (
							<IconWrapper isActive={activeStep === 0}>
								<Play color={activeStep === 0 ? "#FFF" : "#767676"} />
							</IconWrapper>
						),
					},
					{
						title: (
							<span className="text-xs leading-3 text-[#707070] font-normal text-center">
								VERIFICATION DETAILS
							</span>
						),
						icon: (
							<IconWrapper isActive={activeStep === 1}>
								<ImStack color={activeStep === 1 ? "#FFF" : "#767676"} />
							</IconWrapper>
						),
					},
					{
						title: (
							<span className="text-xs leading-3 text-[#707070] font-normal text-center">
								PROCESS PAYMENT
							</span>
						),
						icon: (
							<IconWrapper isActive={activeStep === 2}>
								<BsCreditCard color={activeStep === 2 ? "#FFF" : "#767676"} />
							</IconWrapper>
						),
					},
					{
						title: (
							<span className="text-xs leading-3 text-[#707070] font-normal text-center">
								FINISH
							</span>
						),
						icon: (
							<IconWrapper isActive={activeStep === 3}>
								<BsCheck2Circle color={activeStep === 3 ? "#FFF" : "#767676"} />
							</IconWrapper>
						),
					},
				]}
			/>
		</div>
	);
};

export default ActivitySteps;
