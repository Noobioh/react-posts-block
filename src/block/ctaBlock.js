/**
 * BLOCK: japie-block
 *
 * Registering a basic block with Gutenberg.
 * Simple block, renders and saves the same content without any interactivity.
 */

//  Import CSS.
import "./editor.scss";
import "./style.scss";

const { __ } = wp.i18n; // Import __() from wp.i18n
const { registerBlockType } = wp.blocks; // Import registerBlockType() from wp.blocks

/**
 * Register: aa Gutenberg Block.
 *
 * Registers a new block provided a unique name and an object defining its
 * behavior. Once registered, the block is made editor as an option to any
 * editor interface where blocks are implemented.
 *
 * @link https://wordpress.org/gutenberg/handbook/block-api/
 * @param  {string}   name     Block name.
 * @param  {Object}   settings Block settings.
 * @return {?WPBlock}          The block, if it has been successfully
 *                             registered; otherwise `undefined`.
 */
registerBlockType("cgb/block-cta-block", {
	// Block name. Block names must be string that contains a namespace prefix. Example: my-plugin/my-custom-block.
	title: __("CTA Block - CGB Block"), // Block title.
	icon: "shield", // Block icon from Dashicons → https://developer.wordpress.org/resource/dashicons/.
	category: "common", // Block category — Group blocks together based on common traits E.g. common, formatting, layout widgets, embed.
	keywords: [
		__("CTA Block"),
		__("CGB Example"),
		__("create-guten-block"),
	],
	attributes: {
		header: {
			type: "string",
		},
		content: {
			type: "string",
		},
		btnText: {
			type: "string",
		},
		btnLink: {
			type: "string",
		},
	},
	edit: (props) => {
		// console.log(props.attributes.categories);

		function updateHeader(e) {
			props.setAttributes({
				header: e.target.value,
			});
		}

		function updateContent(e) {
			props.setAttributes({
				content: e.target.value,
			});
		}

		function updateBtnText(e) {
			props.setAttributes({
				btnText: e.target.value,
			});
		}

		function updateBtnLink(e) {
			props.setAttributes({
				btnLink: e.target.value,
			});
		}

		// Creates a <p class='wp-block-cgb-block-japie-block'></p>.
		return (
			<div className="hd-cta">
				<div className="hd-cta__row">
				<div className="hd-cta__col">
						<div className="hd-cta__title">
							<input onChange={updateHeader} value={props.attributes.header} type="text" placeholder="Header" />
						</div>
					</div>
				</div>
				<div className="hd-cta__row">
					<div className="hd-cta__col">
						<div className="hd-cta__content">
							<textarea onChange={updateContent} value={props.attributes.content} placeholder="Content" />
						</div>
					</div>
					<div className="hd-cta__col">
						<div className="hd-cta__btn">
							<input type="text" onChange={ updateBtnText } value={props.attributes.btnText} placeholder="Button text..." />
							<input type="text" onChange={updateBtnLink } value={props.attributes.btnLink} placeholder="Button link..." />
						</div>
					</div>
				</div>
			</div>
		);
	},

	save: (props) => {
		return (
			<div className="hd-cta">
				<div className="hd-cta__row">
				<div className="hd-cta__col">
						<div className="hd-cta__title">
						<h3> { props.attributes.header } </h3>
						</div>
					</div>
				</div>
				<div className="hd-cta__row">
					<div className="hd-cta__col">
						<div className="hd-cta__content">
							<p> { props.attributes.content } </p>
						</div>
					</div>
					<div className="hd-cta__col">
						<div className="hd-cta__btn">
							<a className="btn btn__cta" href={ props.attributes.btnLink }> {props.attributes.btnText} </a>
						</div>
					</div>
				</div>
			</div>
		);
	},
});
