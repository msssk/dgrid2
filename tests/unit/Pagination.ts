import { assert } from 'chai';
import harness, { assignProperties, assignChildProperties, Harness, replaceChild } from '@dojo/test-extras/harness';
import { v, w } from '@dojo/widget-core/d';
import { VNode } from '@dojo/interfaces/vdom';
import * as registerSuite from 'intern/lib/interfaces/object';
import PageLink from '../../src/pagination/PageLink';
import Pagination, { PaginationProperties } from '../../src/Pagination';
import * as css from '../../src/styles/pagination.m.css';

let widget: Harness<PaginationProperties, typeof Pagination>;

registerSuite({
	name: 'Pagination',

	beforeEach() {
		widget = harness(Pagination);
	},

	afterEach() {
		widget.destroy();
	},

	render: {
		'single page'() {
			// TODO: move `widget.classes` call inline when test-extras is fixed
			const childClasses = widget.classes(css.status);
			const props = {
				page: 1,
				pages: 1,
				statusMessage: 'test message'
			};

			widget.setProperties(props);

			widget.expectRender(v('div', {
				classes: widget.classes(css.pagination)
			}, [
				v('div', {
					classes: childClasses
				}, [ props.statusMessage ])
			]));
		},

		'multiple pages'() {
			// TODO: move `widget.classes` call inline when test-extras is fixed
			const statusClass = widget.classes(css.status);
			const navigationClass = widget.classes(css.navigation);
			const pageLinksClass = widget.classes(css.pageLinks);
			const paginationClass = widget.classes(css.pagination);
			const props = {
				page: 1,
				pages: 2,
				statusMessage: 'test message'
			};

			widget.setProperties(props);

			widget.expectRender(v('div', {
				classes: paginationClass
			}, [
				v('div', {
					classes: statusClass
				}, [ props.statusMessage ]),
				v('div', {
					classes: navigationClass
				}, [
					w(PageLink, {
						key: 'previous',
						disabled: true,
						isArrow: true,
						label: '‹',
						page: 0
					}),
					v('span', {
						classes: pageLinksClass
					}, [
						w(PageLink, {
							key: '1',
							disabled: true,
							page: 1
						}),
						w(PageLink, {
							key: '2',
							disabled: false,
							page: 2
						})
					]),
					w(PageLink, {
						key: 'next',
						disabled: false,
						isArrow: true,
						label: '›',
						page: props.pages
					})
				])
			]));
		},

		'middle page'() {
			// TODO: move `widget.classes` call inline when test-extras is fixed
			const statusClass = widget.classes(css.status);
			const pageSkipClass = widget.classes(css.pageSkip);
			const navigationClass = widget.classes(css.navigation);
			const pageLinksClass = widget.classes(css.pageLinks);
			const paginationClass = widget.classes(css.pagination);
			const props = {
				page: 5,
				pages: 10,
				statusMessage: 'test message'
			};

			widget.setProperties(props);

			widget.expectRender(v('div', {
				classes: paginationClass
			}, [
				v('div', {
					classes: statusClass
				}, [ props.statusMessage ]),
				v('div', {
					classes: navigationClass
				}, [
					w(PageLink, {
						key: 'previous',
						disabled: false,
						isArrow: true,
						label: '‹',
						page: 4
					}),
					v('span', {
						classes: pageLinksClass
					}, [
						w(PageLink, {
							key: '1',
							disabled: false,
							page: 1
						}),
						v('span', {
							classes: pageSkipClass
						}, [ '...' ]),
						w(PageLink, {
							key: '2',
							page: 3
						}),
						w(PageLink, {
							key: '3',
							page: 4
						}),
						w(PageLink, {
							key: '4',
							disabled: true,
							page: 5
						}),
						w(PageLink, {
							key: '5',
							page: 6
						}),
						w(PageLink, {
							key: '6',
							page: 7
						}),
						v('span', {
							classes: pageSkipClass
						}, [ '...' ]),
						w(PageLink, {
							disabled: false,
							key: '10',
							page: 10
						})
					]),
					w(PageLink, {
						key: 'next',
						disabled: false,
						isArrow: true,
						label: '›',
						page: 6
					})
				])
			]));
		}
	}
});
