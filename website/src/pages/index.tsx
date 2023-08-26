import * as React from 'react';
import type { HeadFC, PageProps } from 'gatsby';
import ChatBubble from '../components/ChatBubble';
import Navbar from '../components/Navbar';
import { useState } from 'react';

export const Head: HeadFC = () => <title>Home Page</title>;

function IndexPage() {
	const [isUserAgreedToRules, setIsUserAgreedToRules] = useState(false);

	function goToDiscord() {
		// @ts-ignore
		window.location = 'https://discord.gg/NsD4knqTee';
	}

	return (
		<main className="scroll-smooth motion-reduce:scroll-auto">
			<Navbar />
			<div className="container mx-auto px-20 h-screen flex flex-wrap justify-center items-center">
				<div className="w-full md:w-3/12">
					{/* <!-- Shown on small screens --> */}
					<img
						alt="fullstack.chat logo"
						src="/assets/images/logo-2.png"
						className="logo mx-auto"
					/>
					{/* <!-- Shown on large creens --> */}
					{/* <!-- <g-image alt="fullstack.chat logo" src="/assets/images/logo-2.png" className="logo img-fluid d-none d-lg-block" /> --> */}
				</div>
				<div className="w-full md:w-6/12">
					<h1>👋 Welcome to fullstack.chat!</h1>
					<div className="welcome-text">
						We are a welcome and opening community of developers of all
						skillsets and experience levels. Scroll down to see what our
						community is all about!
					</div>
				</div>
			</div>

			{/* <!-- Info Section --> */}
			<section
				id="about"
				className="lg:py-24 lg:flex lg:justify-center scroll-ms-10"
			>
				<div className="bg-gray-900 py-16 lg:mx-8 lg:flex lg:max-w-5xl lg:shadow-lg lg:rounded-lg">
					<div className=" md:w-1/2 px-16 justify-center items-center order-last md:order-first flex flex-col">
						<ChatBubble username="noobmaster70" imgPath="avatars/1.png">
							Look at this cool thing I did!
						</ChatBubble>
						<ChatBubble username="cryptarchR" imgPath="avatars/2.png">
							Wow thats awesome! Great job 😀
						</ChatBubble>
						<ChatBubble username="wwwion_d1" imgPath="avatars/3.png">
							How exactly does this work? So cool...
						</ChatBubble>
					</div>

					<div className="max-w-xl px-6 lg:max-w-5xl md:w-1/2 order-first md:order-last">
						<h2 className="font-bold text-white md:text-3xl pt-0">
							😊 A Friendly Place for Experts &{' '}
							<span style={{ color: '#4FB0FF' }}>Beginners</span>
						</h2>
						<p className="mt-4 text-gray-400">
							Whether you're a seasoned expert or just getting started,
							fullstack.chat is a safe place to ask questions and grow as a
							developer. There's no such thing as a dumb question with us.
						</p>
					</div>
				</div>
			</section>

			{/* <!-- Rules Section --> */}
			<div
				id="rules"
				className="container mx-auto px-4 lg:px-20 justify-center items-center pt-12 flex text-white scroll-ms-10"
			>
				<div className="flex flex-col w-full md:w-1/2">
					<h3 className="section-header centered-header">💬 Come Say Hello!</h3>
					<div className="rules">
						<div className="rules-intro">
							Before joining, read and agree to the rules below. Help keep our
							server friendly and welcoming!
						</div>
						<div className="rules-container">
							<h3>NSFW Content</h3>
							<p>
								No NSFW content is permitted here. Posting NSFW content will
								result in an immediate ban without warning.
							</p>

							<h3>Accept Others</h3>
							<p>
								Be kind and respectful of all members. We are tolerant of all
								races, genders, LGBTQ, religions, and creeds.
							</p>

							<h3>Addressing Conflicts</h3>
							<p>
								If you take issue with another member, discuss it with them
								PRIVATELY to come to a resolution. If you have done so and the
								issue is not yet resolved, the admins & mods are always open to
								assist in any way we can. It’s also worth noting that mods are
								not monitoring all channels 24/7, so members are expected to
								report issues if a mod is not available.{' '}
							</p>

							<h3>Logging</h3>
							<p>
								Actions that modify or delete content from the Discord are
								logged for reference if needed. This includes the content of
								messages PRIOR to modification, as well as the modified version
								of the message.{' '}
							</p>

							<h3>Constructive Criticism</h3>
							<p>
								Mods and the direction of the community are open to constructive
								criticism. If you feel the group is heading in the wrong
								direction or can be improved in some way, our minds will always
								be open to considerations. Blatant criticism and insulting mods,
								however, will not be tolerated and will result in a ban from the
								server.{' '}
							</p>

							<h3>No Patronizing</h3>
							<p>
								Feel free to celebrate wins and progress in your coding journey,
								but dont talk down to other members or make them feel beneath
								you or anyone else. Direct comparison of your own progress to
								others in a negative context will not be tolerated.
							</p>

							<h3>Trolling</h3>
							<p>
								Trolling can be good natured fun, but can also sincerely offend
								people if they take it the wrong way. Keep trolling to a minimum
								and if you are offended by someone’s comments, discuss it with
								them to cultivate a positive outcome.
							</p>
						</div>

						<div className="rules-footer flex flex-col items-center">
							<div className="form-check agree-to-rules-check">
								<input
									type="checkbox"
									className="form-check-input"
									checked={isUserAgreedToRules}
									onChange={() => setIsUserAgreedToRules(!isUserAgreedToRules)}
								/>
								<label className="form-check-label ml-1">
									I read and agree to the rules above
								</label>
							</div>
							<button
								type="button"
								className={`agree-to-rules-button rounded-md py-1 px-3 ${
									isUserAgreedToRules ? '' : 'agree-to-rules-button-disabled'
								}`}
								disabled={!isUserAgreedToRules}
								onClick={() => goToDiscord()}
							>
								Join fullstack.chat!
							</button>
						</div>
					</div>
				</div>
			</div>
		</main>
	);
}

export default IndexPage;
