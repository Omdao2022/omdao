import React, { FC } from "react";
import {
	FiUsers,
	FiMapPin,
	FiMail,
	FiCalendar,
	FiVoicemail,
} from "react-icons/fi";
import { useRecoilState } from "recoil";
import { userAtom } from "../../recoil/atom/userAtom";

const MyProfile: FC = () => {
	const [userState] = useRecoilState(userAtom);

	return (
		<>
			<h1 className="text-3xl font-bold font-sans m-6 flex justify-center">
				My Profile
			</h1>
			<div className="flex flex-col justify-center">
				<div className="my-2 flex justify-between">
					<div className="w-[50%]">
						<h6>Name</h6>
						<div className="flex items-center bg-slate-800 px-8 py-3 rounded-xl">
							<FiUsers />
							&nbsp;| &nbsp;{" "}
							<span>{userState.firstName + " " + userState.lastName}</span>
						</div>
					</div>
					<div className="w-[50%] ml-4">
						<h6>Birthday</h6>
						<div className="flex items-center bg-slate-800 px-8 py-3 rounded-xl">
							<FiCalendar />
							&nbsp;| &nbsp;{" "}
							<span>
								{userState.birthday
									.toLocaleDateString("en-US", {
										year: "numeric",
										month: "2-digit",
										day: "2-digit",
									})
									.replace(/\//g, "-")}
							</span>
						</div>
					</div>
				</div>
				<div className="my-2">
					<h6>Email</h6>
					<div className="flex items-center bg-slate-800 px-8 py-3 rounded-xl">
						<FiMail />
						&nbsp;| &nbsp; <span>{userState.email}</span>
					</div>
				</div>
				<div className="my-2">
					<h6>Location</h6>
					<div className="flex items-center bg-slate-800 px-8 py-3 rounded-xl">
						<FiMapPin />
						&nbsp;| &nbsp;{" "}
						<span>
							{userState.address +
								" / " +
								userState.location +
								". " +
								userState.country}
						</span>
					</div>
				</div>
				<div className="my-2">
					<h6>Zipcode</h6>
					<div className="flex items-center bg-slate-800 px-8 py-3 rounded-xl">
						<FiVoicemail className="mt-1" />
						&nbsp;| &nbsp; <span>{userState.zipcode}</span>
					</div>
				</div>
			</div>
		</>
	)
}

export default MyProfile;