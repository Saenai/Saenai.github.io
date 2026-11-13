import { getCollection, type CollectionEntry } from 'astro:content';
import { localizedPath, type Locale } from '../i18n';

export async function getProjects(locale: Locale) {
  return (await getCollection('projects', ({ data }) => data.locale === locale))
    .sort((a, b) => a.data.order - b.data.order);
}

export async function getNotes(locale: Locale) {
  return (await getCollection('notes', ({ data }) => data.locale === locale && !data.draft))
    .sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
}

export function contentPath(entry: CollectionEntry<'projects' | 'notes'>) {
  return localizedPath(entry.data.locale, `/${entry.collection}/${entry.id.split('/').at(-1)}/`);
}
