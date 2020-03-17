import {
  html, fixture, expect, oneEvent, elementUpdated
} from '@open-wc/testing';

import { TranscriptConfig, TranscriptEntryConfig } from "@internetarchive/transcript-view";
import { LocalSearchIndex } from '../../lib/src/search-handler/search-indices/local-search-index';
import { TranscriptIndex } from '../../lib/src/search-handler/transcript-index';

describe('Local Search Index', () => {
  it('correctly finds search indices', async () => {
    const entry1 = new TranscriptEntryConfig(1, 0, 4, 'foo bar baz', false);
    const entry2 = new TranscriptEntryConfig(2, 5, 9, 'boop blop', false);
    const entry3 = new TranscriptEntryConfig(3, 10, 13, 'bump baz boing', false);
    const transcriptConfig = new TranscriptConfig([entry1, entry2, entry3]);
    const transcriptIndex = new TranscriptIndex(transcriptConfig);
    const searchIndex = new LocalSearchIndex(transcriptIndex);

    const searchIndices = searchIndex.getSearchRanges('baz');

    expect(searchIndices.length).to.equal(2);
    expect(searchIndices[0].startIndex).to.equal(8);
    expect(searchIndices[0].endIndex).to.equal(11);
    expect(searchIndices[1].startIndex).to.equal(27);
    expect(searchIndices[1].endIndex).to.equal(30);
  });

  it('correctly handles special characters', async () => {
    const entry1 = new TranscriptEntryConfig(1, 0, 4, 'foo bar baz', false);
    const entry2 = new TranscriptEntryConfig(2, 5, 9, 'boop blop', false);
    const entry3 = new TranscriptEntryConfig(3, 10, 13, 'bump baz boing', false);
    const transcriptConfig = new TranscriptConfig([entry1, entry2, entry3]);
    const transcriptIndex = new TranscriptIndex(transcriptConfig);
    const searchIndex = new LocalSearchIndex(transcriptIndex);

    const searchIndices = searchIndex.getSearchRanges('baz|-.*');

    expect(searchIndices.length).to.equal(0);
  });
});
