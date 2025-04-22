import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { SparqlSelect } from './dto/sparql-select.dto';

@Injectable()
export class FusekiService {
  private readonly endpoint =
    process.env.FUSEKI_QUERY_URL ?? 'http://localhost:3030/dataset/query';

  constructor(private httpService: HttpService) {}

  async select(sparql: string): Promise<SparqlSelect> {
    const body = new URLSearchParams({ query: sparql }).toString();

    const { data } = await firstValueFrom(
      this.httpService.post<SparqlSelect>(this.endpoint, body, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Accept: 'application/sparql-results+json',
        },
      }),
    );
    return data;
  }
}
