import nodemailer from "nodemailer";

export const verifyEmail = async (email: string, subject: string, text: string) => {
	try {
		const transporter = nodemailer.createTransport({
			host: process.env.HOST,
			service: process.env.SERVICE,
			port: Number(process.env.EMAIL_PORT),
			secure: Boolean(process.env.SECURE),
			auth: {
				user: process.env.G_EMAIL,
				pass: process.env.G_PASSWORD,
			},
		});

		await transporter.sendMail({
			from: process.env.G_EMAIL,
			to: email,
			subject: subject,
			text: text,
		});
		console.log("email sent successfully");
		return { success: true }
	} catch (error) {
		console.log("email not sent!");
		console.log(error);
		return  { success: false, error }
		;
	}
};
