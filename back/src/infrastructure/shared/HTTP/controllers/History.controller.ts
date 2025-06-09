import {
  Body,
  Controller,
  Get,
  Post,
  Delete,
  Route,
  SuccessResponse,
  Response,
  Tags,
  Path,
  Query
} from 'tsoa';
import { HistoryService } from '../../../../domain/history/application/history.service';
import { container, injectable } from 'tsyringe';
import { ImageInputDTO, ImageOutputDTO } from '../../../../domain/history/historyDto';

/**
 * @description Données attendues pour la création d'un historique
 */
export interface ImageInputRequest {
  /** ID utilisateur */
  userId: number;
  /** Prompt associé à l'image */
  prompt: string;
  /** URL de l'image */
  imageUrl: string;
  /** Date de création */
  createdAt: Date;
}


/**
 * @description Données retournées pour un historique
 */
export interface ImageOutputResponse {
  /** ID de l'historique */
  id: number;
  /** ID utilisateur */
  userId: number;
  /** Prompt associé à l'image */
  prompt: string;
  /** URL de l'image */
  imageUrl: string;
  /** Date de création */
  createdAt: Date;
}

@injectable()
@Route('histories')
@Tags('Histories')
export class HistoryController extends Controller {
  private historyService: HistoryService;

  constructor() {
    super();
    this.historyService = container.resolve(HistoryService);
  }

  /**
   * @summary Créer un historique
   */
  @Post('/')
  @SuccessResponse(201, 'Historique créé')
  @Response(400, 'Paramètres invalides')
  @Response(500, 'Erreur serveur')
  async createHistory(@Body() body: ImageInputRequest): Promise<ImageOutputResponse> {
    try {
      const result = await this.historyService.createHistory(body);
      this.setStatus(201);
      return result;
    } catch (error) {
      this.setStatus(500);
      throw new Error('Erreur lors de la création de l\'historique');
    }
  }

  /**
   * @summary Récupérer un historique par son id
   */
  @Get('/{id}')
  @SuccessResponse(200, 'Historique trouvé')
  @Response(404, 'Non trouvé')
  @Response(500, 'Erreur serveur')
  async getHistory(@Path() id: number): Promise<ImageOutputResponse> {
    const result = await this.historyService.getHistory(id);
    if (!result) {
      this.setStatus(404);
      throw new Error('Historique non trouvé');
    }
    this.setStatus(200);
    if (!result) {
    this.setStatus(404);
    throw new Error('Historique non trouvé');
      }
    return result;
  }

  /**
   * @summary Récupérer tous les historiques d'un utilisateur
   */
  @Get('/')
  @SuccessResponse(200, 'Liste des historiques')
  @Response(500, 'Erreur serveur')
  async getAllHistories(@Query() userId: number): Promise<ImageOutputResponse[]> {
    return await this.historyService.getAllHistories(userId);
  }

  /**
   * @summary Supprimer un historique
   */
  @Delete('/{id}')
  @SuccessResponse(204, 'Supprimé')
  @Response(404, 'Non trouvé')
  @Response(500, 'Erreur serveur')
  async deleteHistory(@Path() id: number): Promise<void> {
    try {
      await this.historyService.deleteHistory(id);
      this.setStatus(204);
    } catch (error) {
      this.setStatus(500);
      throw new Error('Erreur lors de la suppression de l\'historique');
    }
  }
}
