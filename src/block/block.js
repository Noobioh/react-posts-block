/**
 * BLOCK: japie-block
 *
 * Registering a basic block with Gutenberg.
 * Simple block, renders and saves the same content without any interactivity.
 */

//  Import CSS.
import './editor.scss';
import './style.scss';

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
registerBlockType( 'cgb/block-japie-block', {
	// Block name. Block names must be string that contains a namespace prefix. Example: my-plugin/my-custom-block.
	title: __( 'japie-block - CGB Block' ), // Block title.
	icon: 'shield', // Block icon from Dashicons → https://developer.wordpress.org/resource/dashicons/.
	category: 'common', // Block category — Group blocks together based on common traits E.g. common, formatting, layout widgets, embed.
	keywords: [
		__( 'japie-block — CGB Block' ),
		__( 'CGB Example' ),
		__( 'create-guten-block' ),
	],
	attributes: {
		categories: {
			type: 'object'
		},
		types: {
			type: 'object'
		},
		selectedPostType: {
			type: 'string'
		},
		selectedCategory: { 
			type: 'string'
		},
		postsPerPage: { 
			type: 'string'
		},
	},
	edit: ( props ) => {

		if( ! props.attributes.types ) {
			wp.apiFetch( {
				url: '/wp-json/wp/v2/types'
			} ).then( types => {
				props.setAttributes( {
					types: types
				} )
			} ); 
		}

		if( ! props.attributes.categories ) {
			wp.apiFetch( {
				url: '/wp-json/wp/v2/categories'
			} ).then( categories => {
				props.setAttributes( {
					categories: categories
				} )
			} ); 
		}


		if( ! props.attributes.types ) {
			return 'Loading...'; 
		}

		if( ! props.attributes.categories ) {
			return 'Loading...'; 
		}


		if( props.attributes.types && props.attributes.types === 0) {
			return 'Nothing found';
		}

		
		console.log( props.attributes.categories );

		function updatePostType( e ) {
			props.setAttributes( {
				selectedPostType: e.target.value,
			} )
		}

		function updatePostsPerPage( e ) {
			props.setAttributes( {
				postsPerPage: e.target.value,
			} );
		}

		function updateCategories( e ) {
			props.setAttributes( {
				selectedCategory: e.target.value,
			} )
		}

		// Creates a <p class='wp-block-cgb-block-japie-block'></p>.
		return (
			<div>
				<label>Post-type</label>
				<select onChange={updatePostType} value={ props.attributes.selectedPostType }>
					{
					Object.keys(props.attributes.types).map((keyName, i )  =>
								<option value={keyName} key={i}>
									{keyName}
								</option>
							)}
				</select>
				<label>Categories</label>

				<select onchange={ updateCategories } value={ props.attributes.selectedCategory }>
					{
						props.attributes.categories.map( category => { 
							return (
								<option value={ category.id } key={ category.id }>
									{ category.name }
								</option>
							)
						 } )
					}
				</select>
				<label>Posts per page</label>
				<input type="text" onBlur={ updatePostsPerPage } value={ props.attributes.postsPerPage } />
			</div>
		);
	},


	save: ( props ) => {
		return null;
	},
} );
