import { useState } from "react";
import {
	AiOutlineSearch,
	AiOutlineMessage,
	AiOutlineMenu,
	AiOutlineQuestionCircle,
	AiFillCloseCircle,
} from "react-icons/ai";
import {
	MdDarkMode,
	MdLightMode,
	MdNotificationsNone,
	MdNotificationsActive,
} from "react-icons/md";
import { FaChevronDown } from "react-icons/fa";

import { useDispatch, useSelector } from "react-redux";
import { setTheme } from "store/theme/theme.slice";
import { setLogout } from "store/auth/auth.slice";
import { useNavigate } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import { Layout } from "components/layout";

export const Navbar = () => {
	const theme = useSelector((state) => state.theme);
	const dispatch = useDispatch();
	const navigate = useNavigate();
	// const user = useSelector((state) => state.user);
	// const fullName = `${user.firstName} ${user.lastName}`;
	const [isMobileMenuToggled, setIsMobileMenuToggled] = useState(false);
	const isNonMobileScreens = useMediaQuery({ minWidth: 1000 });

	return (
		<Layout>
			<div className="navbar">
				<div className="navbar__main">
					<div className="navbar__main_logo" onClick={() => navigate("/home")}>
						Social-Network
					</div>
					{isNonMobileScreens && (
						<div className="navbar__main_search">
							<input
								type="text"
								className="navbar__main_search_input"
								placeholder="Search..."
							/>
							<button className="navbar__main_search_btn" type="submit">
								<AiOutlineSearch className="navbar__main_search_btn_icon" />
							</button>
						</div>
					)}
				</div>
				{isNonMobileScreens ? (
					<div className="navbar__nav">
						<button className="navbar__nav_mode_btn" onClick={() => dispatch(setTheme())}>
							{theme === "dark-theme" ? (
								<MdDarkMode className="navbar__nav_mode_btn_icon" />
							) : (
								<MdLightMode className="navbar__nav_mode_btn_icon" />
							)}
						</button>
						<AiOutlineMessage />
						<MdNotificationsNone />
						<AiOutlineQuestionCircle />
						<div className="navbar__nav_dropdown">
							<button className="navbar__nav_dropdown_btn">
								<span className="navbar__nav_dropdown_btn_text">fullName</span>
								<span class="navbar__nav_dropdown_btn_icon">▼</span>
							</button>
							<ul className="navbar__nav_dropdown_menu">
								<li className="navbar__nav_dropdown_menu_item">fullName</li>
								<li className="navbar__nav_dropdown_menu_item" onClick={() => setLogout()}>
									Log Out
								</li>
							</ul>
						</div>
					</div>
				) : (
					<button
						className="navbar__menu_btn"
						onClick={() => setIsMobileMenuToggled(!isMobileMenuToggled)}
					>
						<AiOutlineMenu className="navbar__menu_btn_icon" />
					</button>
				)}

				{!isNonMobileScreens && isMobileMenuToggled && (
					<div className="navbar__menu">
						<div className="navbar__menu_close">
							<button
								className="navbar__menu_close_btn"
								onClick={() => setIsMobileMenuToggled(!isMobileMenuToggled)}
							>
								<AiFillCloseCircle className="navbar__menu_close_btn_icon" />
							</button>
						</div>

						<div className="navbar__menu_items">
							<button
								className="navbar__menu_items_mode_btn"
								onClick={() => dispatch(setTheme())}
							>
								{theme === "dark-theme" ? (
									<MdDarkMode className="navbar__menu_items_mode_btn_icon" />
								) : (
									<MdLightMode className="navbar__menu_items_mode_btn_icon" />
								)}
							</button>
							<AiOutlineMessage />
							<MdNotificationsNone />
							<AiOutlineQuestionCircle />
							<div className="navbar__nav_dropdown">
								<button className="navbar__menu_items_dropdown_btn">
									<span className="navbar__menu_items_dropdown_btn_text">fullName</span>
									<span class="navbar__menu_items_dropdown_btn_icon">▼</span>
								</button>
								<ul className="navbar__menu_items_dropdown_menu">
									<li className="navbar__menu_items_dropdown_menu_item">fullName</li>
									<li
										className="navbar__menu_items_dropdown_menu_item"
										onClick={() => setLogout()}
									>
										Log Out
									</li>
								</ul>
							</div>
						</div>
					</div>
				)}
			</div>
		</Layout>
	);
};
