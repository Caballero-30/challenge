import { Item } from './item.entity'
import { MIN_QUALITY, MAX_QUALITY } from './constants'
import { ItemName } from './item-name.enum'

export class GildedRose {
  private readonly items: ReadonlyArray<Item>

  constructor(items = new Array<Item>()) {
    this.items = items
  }

  private updateNormalItem(item: Item): Item {
    const sellIn = item.sellIn - 1
    const val = sellIn < 0 ? 2 : 1
    const quality = Math.max(MIN_QUALITY, item.quality - val)

    return new Item(item.name, sellIn, quality)
  }

  private updateAgedBrie(item: Item) {
    const sellIn = item.sellIn - 1
    const val = sellIn < 0 ? 2 : 1
    const quality = Math.min(
      MAX_QUALITY,
      item.quality + val
    )

    return new Item(item.name, sellIn, quality)
  }

  private updateBackstagePasses(item: Item) {
    const sellIn = item.sellIn - 1
    const firstTernary = sellIn < 5 ? 3 : 1
    const secondTernary = sellIn < 10 ? 2 : firstTernary
    const quality = sellIn < 0
      ? MIN_QUALITY
      : Math.min(MAX_QUALITY, item.quality + secondTernary)

    return new Item(item.name, sellIn, quality)
  }

  private updateSulfuras(item: Item) {
    return item
  }

  private updateConjuredItem(item: Item) {
    const sellIn = item.sellIn - 1
    const quality = Math.max(
      MIN_QUALITY,
      item.quality - (sellIn < 0 ? 4 : 2)
    )

    return new Item(item.name, sellIn, quality)
  }

  updateQuality() {
    const updateStrategies: Record<string, (item: Item) => Item> = {
      [ItemName.AGED_BRIE]: this.updateAgedBrie.bind(this),
      [ItemName.BACKSTAGE_PASSES]: this.updateBackstagePasses.bind(this),
      [ItemName.SULFURAS]: this.updateSulfuras.bind(this),
      [ItemName.CONJURED]: this.updateConjuredItem.bind(this)
    }

    return this.items.map(it => {
      const strategy = updateStrategies[it.name] || this.updateNormalItem.bind(this)

      return strategy(it)
    })
  }
}
